import React, { useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, message });
    setIsSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      setRating(0);
      setMessage('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary-600" />
          Platform Feedback
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Help us improve GreenOps by sharing your experience and suggestions.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-500 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h3>
              <p className="text-gray-600">
                Your feedback has been successfully submitted and will help us make GreenOps better for everyone.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you rate your experience?
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full transition-transform hover:scale-110"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star 
                        className={`w-10 h-10 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                {rating === 0 && (
                  <p className="text-xs text-amber-600 mt-2">Please select a rating</p>
                )}
              </div>

              <div className="w-full pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What could we improve? (Optional)
                </label>
                <textarea
                  className="block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all min-h-[150px]"
                  placeholder="Tell us about what you loved or what needs work..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={rating === 0}
                >
                  Submit Feedback
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      
      {/* Past Feedback section could go here if needed, but usually feedback forms are just submissions */}
    </div>
  );
};

export default Feedback;
