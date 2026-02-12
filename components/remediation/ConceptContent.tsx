import { RemediationContent } from '@/lib/types';

interface ConceptContentProps {
  content: RemediationContent & {
    keyPoints?: string[];
    examples?: string[];
    studyResources?: Array<{
      title: string;
      type: string;
      description: string;
    }>;
    youtubeSearchQuery?: string;
    source?: string;
  };
}

export default function ConceptContent({ content }: ConceptContentProps) {
  // Generate YouTube embed URL from search query
  const getYouTubeEmbedUrl = (searchQuery: string) => {
    // For simplicity, we'll create a YouTube search URL
    // In production, you might want to use YouTube Data API to get actual video IDs
    const encodedQuery = encodeURIComponent(searchQuery);
    return `https://www.youtube.com/results?search_query=${encodedQuery}`;
  };

  return (
    <div className="space-y-5 sm:space-y-7">
      {/* AI Badge */}
      {content.source === 'ai' && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-xs font-medium text-blue-800">
          <span className="mr-1">✨</span> Premium Content
        </div>
      )}

      {/* Concept Name as Heading */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
        {content.conceptName}
      </h1>

      {/* Explanation Section */}
      <div className="space-y-2 sm:space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Explanation</h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {content.explanation}
        </p>
      </div>

      {/* Key Points Section */}
      {content.keyPoints && content.keyPoints.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Key Points</h2>
          <ul className="space-y-2">
            {content.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Examples Section */}
      {content.examples && content.examples.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Examples</h2>
          <div className="space-y-3">
            {content.examples.map((example, index) => (
              <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-5 rounded-r-lg shadow-sm">
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium whitespace-pre-line">
                  {example}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : content.example && (
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Example</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-5 rounded-r-lg shadow-sm">
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
              {content.example}
            </p>
          </div>
        </div>
      )}

      {/* Common Mistake Section */}
      {content.commonMistake && (
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Common Mistake</h2>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-lg shadow-sm">
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
              {content.commonMistake}
            </p>
          </div>
        </div>
      )}

      {/* Study Resources Section */}
      {content.studyResources && content.studyResources.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Study Resources</h2>
          <div className="grid gap-3">
            {content.studyResources.map((resource, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">
                    {resource.type === 'video' ? '🎥' : resource.type === 'article' ? '📄' : '✏️'}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">{resource.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{resource.description}</p>
                    <span className="inline-block mt-2 text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* YouTube Video Recommendations */}
      {content.youtubeSearchQuery && (
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">📺</span> Video Tutorials
          </h2>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 p-4 sm:p-5 rounded-lg shadow-sm">
            <p className="text-sm sm:text-base text-gray-700 mb-3">
              Watch video tutorials to better understand this concept:
            </p>
            <a
              href={getYouTubeEmbedUrl(content.youtubeSearchQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
              <span className="mr-2">▶️</span>
              Search on YouTube: {content.youtubeSearchQuery}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
