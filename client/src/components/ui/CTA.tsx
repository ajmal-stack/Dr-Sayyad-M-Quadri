import {
  CalendarDaysIcon,
  PlayIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function CTA() {
  return (
    <section className='py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='w-full h-full bg-repeat'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className='absolute top-20 left-10 w-20 h-20 bg-blue-200/20 rounded-full blur-xl animate-pulse' />
      <div className='absolute bottom-20 right-10 w-32 h-32 bg-indigo-200/20 rounded-full blur-xl animate-pulse delay-1000' />
      <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-500' />

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Main CTA Card */}
        <div className='bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12 text-center'>
          <div className='mb-8'>
            <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight'>
              Ready to Transform Your Life?
            </h2>
            <p className='text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto'>
              Take the first step towards better mental health. Schedule your
              consultation today and begin your journey to wellness with
              personalized care.
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-6 justify-center mb-12'>
            <button className='group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'>
              <CalendarDaysIcon className='w-5 h-5 mr-2 group-hover:scale-110 transition-transform' />
              Book Consultation
              <ArrowRightIcon className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
            </button>
            <button className='group inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 rounded-2xl font-semibold text-lg hover:bg-slate-50 transition-all duration-300 border border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg'>
              <PlayIcon className='w-5 h-5 mr-2 group-hover:scale-110 transition-transform' />
              Listen to Podcast
            </button>
          </div>

          {/* Trust Indicators */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                Licensed Professional
              </h3>
              <p className='text-slate-600'>
                Board-certified psychiatrist with 10+ years experience
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                Confidential & Secure
              </h3>
              <p className='text-slate-600'>
                HIPAA compliant with complete privacy protection
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                Personalized Care
              </h3>
              <p className='text-slate-600'>
                Tailored treatment plans for your unique needs
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className='mt-8 pt-8 border-t border-slate-200'>
            <p className='text-slate-600 mb-4'>
              <strong className='text-slate-900'>Emergency Support:</strong>{' '}
              Available 24/7 for urgent mental health concerns
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-slate-500'>
              <span>📞 Call: (555) 123-4567</span>
              <span className='hidden sm:block'>•</span>
              <span>📧 Email: contact@drSyedquadri.com</span>
              <span className='hidden sm:block'>•</span>
              <span>🕒 Mon-Fri: 9AM-6PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
