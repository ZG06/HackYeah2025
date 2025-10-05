import Constants from 'expo-constants';


export async function generateInsights(entries: any[]) {
    const {
        HUGGINGFACE_API_KEY
    } = Constants.expoConfig?.extra || {}
    const API_URL = "https://router.huggingface.co/v1/chat/completions";

    try {
        const formattedData = entries.map(e => 
            `- ${e.activity || 'Focus session'} at ${e.timestamp} mins, Focus: ${e.focusLevel}/10, Distractions: ${e.distraction || 'None'}, additional notes: ${e.notes || 'None'}`
        ).join("\n");

        const messages = [
            {
                role: "system",
                content: "You are an AI productivity coach. Analyze focus sessions and provide insights in the specified JSON format."
            },
            {
                role: "user",
                content: `Analyze these focus sessions and return a JSON object with these exact fields:
{
    "summary": "Brief summary",
    "peak_performance": { "time_window": "e.g. 9-11 AM" },
    "distraction_analysis": { "top_distraction": "the most frequent distraction type" },
    "trend_analysis": { 
        "current_trend": "improving/stable/declining",
        "suggested_actions": ["suggestion 1", "suggestion 2"]
    },
    "personalized_recommendations": ["recommendation 1", "recommendation 2"]
}

Sessions:
${formattedData}`
            }
        ];

        // console.log("Sending request to Hugging Face...");
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "deepseek-ai/DeepSeek-V3-0324",
                messages: messages,
                temperature: 0.7,
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error:", {
                status: response.status,
                statusText: response.statusText,
                error: errorText
            });
            throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        // console.log("API Response:", JSON.stringify(result, null, 2));

        // Extract the content from the response
        const content = result.choices?.[0]?.message?.content;
        if (!content) {
            throw new Error("No content in API response");
        }

        // Try to parse the JSON response
        try {
            // Sometimes the response might be wrapped in markdown code blocks
            const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
            const jsonString = jsonMatch ? jsonMatch[1] : content;
            return JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse JSON:", content);
            return createFallbackResponse("Could not parse AI response");
        }

    } catch (error) {
        console.error("Error in generateInsights:", error);
        return createFallbackResponse("Failed to connect to AI service");
    }
}

function createFallbackResponse(message?: string) {
    // Mock response for testing
    const mockResponse = {
        summary: "Based on your recent focus sessions, you're showing good consistency with room for improvement in minimizing distractions.",
        peak_performance: { time_window: "Morning (9-11 AM)" },
        distraction_analysis: { top_distraction: "Phone notifications" },
        trend_analysis: { 
            current_trend: "improving",
            suggested_actions: ["Try the Pomodoro technique", "Schedule focus blocks in your calendar"]
        },
        personalized_recommendations: [
            "Consider turning off notifications during focus sessions",
            "Try to maintain your morning focus routine"
        ]
    };
    
    return message ? { ...mockResponse, error: message } : mockResponse;
}