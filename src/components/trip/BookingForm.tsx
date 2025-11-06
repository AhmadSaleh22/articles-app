'use client'

interface BookingFormProps {
  price: number
  onSubmit?: (data: FormData) => void
}

export function BookingForm({ price, onSubmit }: BookingFormProps) {
  return (
    <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6 sticky top-24">
      <form className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="font-['IBM_Plex_Sans'] font-medium text-xl text-white mb-2">
            Join this adventure
          </h2>
          <p className="text-sm text-neutral-400">
            Secure your spot on this amazing journey!
          </p>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g., Fatima G Ibrahim"
            required
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="e.g., fatima@email.com"
            required
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
          />
        </div>

        {/* Additional Message */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Additional message (optional)
          </label>
          <textarea
            rows={4}
            placeholder="Any special requests or questions?"
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
          />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 rounded-lg">
          <span className="text-sm text-neutral-400">Trip price:</span>
          <span className="text-lg font-medium text-white">${price}</span>
        </div>

        {/* Book Now Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#C9A96E] text-[#171717] rounded-lg font-medium hover:bg-[#B89960] transition-colors"
        >
          Book Now
        </button>

        {/* Terms Text */}
        <p className="text-xs text-neutral-500 text-center">
          By booking, you agree to our terms and conditions. You'll receive a
          confirmation email shortly.
        </p>
      </form>
    </div>
  )
}
