import { TripPage } from '@/components/trip'

export default function Trip() {
  return (
    <TripPage
      heroImageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=400&fit=crop&q=80"
      title="Insert card title here"
      tags={['AVAILABLE', 'Museums']}
      fromLocation="Interlaken, Swiss"
      toLocation="Zermatt, Swiss"
      date="August 15, 2025"
      duration="4 nights, 3 days"
      groupSize="6-12 people"
      languages="English, Arabic"
      price={850}
      aboutText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sagittis tempor. Donec elementum ornare justo, nec feugiat lorem sodales eu. Ut tincidunt, velit eget faucibus auctor, odio metus porttitor ipsum, in lobortis mi felis fermentum nulla. Donec iaculis tincidunt lacinia. Vestibulum vel volutpat ante. Mauris rutrum enim vitae mi posuere, sit amet pulvinar orci tincidunt. Vivamus imperdiet tempus faucibus. Sed vitae leo eget lectus venenatis pharetra. Phasellus dictum eget turpis in molestie. Nullam facilisis ultrices arcu vitae viverra. Praesent cursus felis at nisl fringilla, in semper nisl lacinia. Maecenas ut purus et ex scelerisque tempor a non ante."
      highlights={[
        'Lorem ipsum dolor sit amet elit.',
        'Sed ac sapien tristique urna porta leo.',
        'Quisque tempor felis a pretium.',
        'Fusce suscipit felis ut sem bibendum.',
        'Maecenas vel nulla nec leo tincidunt.',
        'In tempor massa eget lobortis',
      ]}
      routeStops={[
        {
          id: 1,
          title: 'Journey schedule title',
          date: 'Month 00, 1234',
          time: '00:00 PM',
          description:
            'Lorem ipsum dolor sit amet adipiscing elit. Curabitur sodales sagittis tempor onec ornare justo nec feugiat lorem sodales eut tincidunt velit auctor odio metus.',
          location: 'Lat: 46.6863, Lng: 7.8632',
          imageUrl:
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=160&fit=crop&q=80',
        },
        {
          id: 2,
          title: 'Journey schedule title',
          date: 'Month 00, 1234',
          time: '00:00 PM',
          description:
            'Lorem ipsum dolor sit amet adipiscing elit. Curabitur sodales sagittis tempor onec ornare justo nec feugiat lorem sodales eut tincidunt velit auctor odio metus.',
          location: 'Lat: 46.6863, Lng: 7.8632',
          imageUrl:
            'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=160&fit=crop&q=80',
        },
        {
          id: 3,
          title: 'Journey schedule title',
          date: 'Month 00, 1234',
          time: '00:00 PM',
          description:
            'Lorem ipsum dolor sit amet adipiscing elit. Curabitur sodales sagittis tempor onec ornare justo nec feugiat lorem sodales eut tincidunt velit auctor odio metus.',
          location: 'Lat: 46.6863, Lng: 7.8632',
          imageUrl:
            'https://images.unsplash.com/photo-1541336032412-2048a678540d?w=600&h=160&fit=crop&q=80',
        },
        {
          id: 4,
          title: 'Journey schedule title',
          date: 'Month 00, 1234',
          time: '00:00 PM',
          description:
            'Lorem ipsum dolor sit amet adipiscing elit. Curabitur sodales sagittis tempor onec ornare justo nec feugiat lorem sodales eut tincidunt velit auctor odio metus.',
          location: 'Lat: 46.6863, Lng: 7.8632',
          imageUrl:
            'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=160&fit=crop&q=80',
        },
        {
          id: 5,
          title: 'Finish',
          date: 'Month 00, 1234',
          time: '00:00 PM',
          description: '',
          location: '',
        },
      ]}
    />
  )
}
