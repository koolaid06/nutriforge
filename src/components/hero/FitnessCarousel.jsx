const IMAGES = [
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
  'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=800',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800',
  'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800',
  'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800',
  'https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=800',
]

export default function FitnessCarousel() {
  return (
    <div className="w-full overflow-hidden mt-16 relative">

      <div className="flex gap-6 animate-scroll">

        {[...IMAGES, ...IMAGES].map((src, i) => (
          <div
            key={i}
            className="min-w-[280px] h-[180px] rounded-2xl overflow-hidden flex-shrink-0
                       border border-forge-border bg-forge-surface"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition"
            />
          </div>
        ))}

      </div>

    </div>
  )
}