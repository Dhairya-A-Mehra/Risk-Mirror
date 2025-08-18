def calculate_final_score(survey_data: dict) -> dict:
    """
    Calculates the holistic risk score based on survey data.
    This is a simplified MVP version.
    """
    try:
        # Psychometric Score (0-100)
        psychometric_responses = survey_data.get("psychometric", {}).values()
        subjective_score = (
            (sum(psychometric_responses) / (len(psychometric_responses) * 4)) * 100
            if psychometric_responses
            else 50
        )

        # Financial Capacity Score (0-100) - Very simplified
        financials = survey_data.get("financial", {})
        income = financials.get("income", 50000)
        savings = financials.get("savings", 10000)
        capacity_score = min(100, (savings / income) * 100) if income > 0 else 50

        # Final weighted score
        final_score = (0.6 * capacity_score) + (0.4 * subjective_score)

        return {
            "risk_dna_score": round(final_score, 2),
            "calm_index_score": round(
                100 - subjective_score, 2
            ),  # Inverse for calmness
        }
    except Exception as e:
        print(f"Error calculating score: {e}")
        return {"risk_dna_score": 50.0, "calm_index_score": 50.0}
