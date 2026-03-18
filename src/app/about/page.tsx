export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">About EduQuest</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Making Education Accessible and Engaging
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            EduQuest is designed to bring quality education to rural students through an engaging, gamified learning platform.
          </p>
        </div>

        <div className="mt-20">
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              <p className="mt-4 text-lg text-gray-500">
                To bridge the educational gap in rural areas by providing an accessible, engaging, and effective learning platform that works even with limited internet connectivity.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">How It Works</h3>
              <div className="mt-4 space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Sign Up</h4>
                    <p className="mt-2 text-gray-500">
                      Sign in securely with your Google account—no passwords to remember or phone OTPs required.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Choose Your Path</h4>
                    <p className="mt-2 text-gray-500">
                      Select your grade level and subjects. Our system adapts to your learning pace.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Learn and Earn</h4>
                    <p className="mt-2 text-gray-500">
                      Complete lessons, earn points, and unlock achievements as you progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">Key Features</h3>
              <ul className="mt-4 space-y-4 text-lg text-gray-500">
                <li>✓ Works offline - download lessons for later</li>
                <li>✓ Gamified learning experience</li>
                <li>✓ Progress tracking and analytics</li>
                <li>✓ Multi-language support</li>
                <li>✓ Interactive quizzes and games</li>
                <li>✓ Peer challenges and competitions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}