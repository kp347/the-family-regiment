interface Recommendation {
  id: string;
  name: string;
  category: string;
  score: number;
  summary: string;
  reasons: string[];
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
            {recommendation.category}
          </p>

          <h3 className="mt-2 text-2xl font-serif">
            {recommendation.name}
          </h3>
        </div>

        <div className="rounded-full border border-stone-200 px-3 py-1 text-sm text-stone-600">
          Score {recommendation.score}
        </div>
      </div>

      <p className="mt-5 leading-7 text-stone-700">
        {recommendation.summary}
      </p>

      {recommendation.reasons.length > 0 && (
        <div className="mt-6 border-t border-stone-100 pt-5">
          <p className="text-sm font-semibold text-stone-900">
            Why this was recommended
          </p>

          <ul className="mt-3 space-y-2">
            {recommendation.reasons.map(
              (reason, index) => (
                <li
                  key={`${recommendation.id}-${index}`}
                  className="flex gap-3 text-sm leading-6 text-stone-600"
                >
                  <span aria-hidden="true">
                    •
                  </span>

                  <span>{reason}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </article>
  );
}