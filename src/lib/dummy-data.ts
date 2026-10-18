import { WeddingInvitationData, GuestbookEntry } from '@/types/invitation';

export const portfolioWeddingData: WeddingInvitationData = {
  id: 'demo-wedding-2026',
  slug: 'arya-kirana',
  themeId: 'editorial',
  isPortfolioDemo: true,
  couple: {
    groom: {
      fullName: 'Arya Satria Dananjaya, S.T., M.Sc.',
      nickname: 'Arya',
      fatherName: 'Ir. Bambang Trihatmojo',
      motherName: 'Dra. Endang Purwaningsih',
      instagramHandle: '@aryasatria',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
    },
    bride: {
      fullName: 'Kirana Larasati Kusumawardhani, S.Ds.',
      nickname: 'Kirana',
      fatherName: 'Dr. Hendro Wardhana, Sp.A(K)',
      motherName: 'Siti Nurhaliza, M.Pd.',
      instagramHandle: '@kiranalarasati',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    },
  },
  events: {
    akad: {
      title: 'Akad Nikah',
      dateISO: '2026-12-12T08:00:00+07:00',
      endTimeISO: '2026-12-12T10:30:00+07:00',
      timezoneLabel: 'WIB',
      description: 'Prosesi sakral ijab kabul dan doa restu bersama keluarga besar tercinta.',
    },
    reception: {
      title: 'Resepsi Pernikahan',
      dateISO: '2026-12-12T19:00:00+07:00',
      endTimeISO: '2026-12-12T22:00:00+07:00',
      timezoneLabel: 'WIB',
      description: 'Malam perayaan kebersamaan, ramah tamah, jamuan makan malam, dan hiburan musik akustik.',
    },
  },
  location: {
    venueName: 'The Majestic Glass House Jakarta',
    fullAddress: 'Jl. Dharmawangsa Utama No. 88, Kebayoran Baru, Jakarta Selatan 12160',
    landmarkNotes: 'Masuk melalui Gerbang Utama Selatan (South Gate), seberang Brawijaya Heritage Park. Layanan Valet Parking tersedia di lobby depan.',
    visualMapAssetUrl: '/images/map-denah.svg',
    venueSketchUrl: '/images/venue-sketch.svg',
    venueTags: [
      'Setting: Indoor Glass Ballroom',
      'Parking: Valet On-Site',
      'Akses Kursi Roda',
    ],
    coordinates: {
      lat: -6.2590,
      lng: 106.7995,
    },
    googleMapsPlaceId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  },
  audio: {
    srcUrl: '/audio/wedding-bgm.mp3',
    title: 'Acoustic Serenade for Two',
    artist: 'The Chamber Ensemble',
  },
  gallery: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=75&auto=format&fit=crop', // Cover couple editorial
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop', // Ring & detail
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop', // Intimate stroll
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop', // Editorial veil
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop', // Glasshouse venue vibe
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop', // Sunset horizon
  ],
  loveStory: [
    {
      year: '2019',
      title: 'Pertemuan Pertama di Kampus Ganesha',
      story: 'Sebuah percakapan singkat di lorong perpustakaan teknik yang tak disangka membuka diskusi panjang mengenai mimpi, arsitektur, dan cita-cita hidup.',
    },
    {
      year: '2021',
      title: 'Melewati Jarak dan Ujian Waktu',
      story: 'Dua tahun penuh kedewasaan ketika jarak memisahkan kami untuk studi lanjut, membuktikan bahwa komitmen tulus selalu menemukan jalannya pulang.',
    },
    {
      year: '2024',
      title: 'Janji Suci di Kaki Langit Bromo',
      story: 'Di bawah kabut fajar yang perlahan menyingsing, sebuah pertanyaan sederhana terucap dengan penuh keyakinan dan disambut dengan senyuman bahagia.',
    },
    {
      year: '2026',
      title: 'Membangun Rumah Bersama',
      story: 'Kini, dengan restu tulus kedua orang tua dan sanak keluarga, kami siap mengikat janji suci seumur hidup dan memulai lembaran baru.',
    },
  ],
  rundown: [
    {
      time: '08:00',
      title: 'Kedatangan Tamu',
      description: 'Penyambutan hangat keluarga besar dan sahabat di serambi kaca utama.',
      iconType: 'arrival',
    },
    {
      time: '09:00',
      title: 'Akad Nikah',
      description: 'Prosesi sakral pengucapan ijab kabul dan pembacaan doa restu.',
      iconType: 'rings',
    },
    {
      time: '11:00',
      title: 'Sesi Foto & Ramah Tamah',
      description: 'Abadikan momen kebahagiaan bersama kedua mempelai dan keluarga.',
      iconType: 'camera',
    },
    {
      time: '18:30',
      title: 'Resepsi & Jamuan Malam',
      description: 'Malam perayaan cinta dengan sajian kuliner pilihan dan alunan musik kamar.',
      iconType: 'dinner',
    },
    {
      time: '21:00',
      title: 'Perayaan & Penutup',
      description: 'Dansa perdana, pelepasan doa haru, dan ungkapan terima kasih mempelai.',
      iconType: 'music',
    },
  ],
  dressCode: {
    title: 'Panduan Busana & Palet Warna',
    description: 'Kami mengundang Anda untuk mengenakan busana terbaik dalam nuansa warna hangat dan bumi (Earth & Warm Tones) untuk menyempurnakan harmoni visual hari bahagia kami.',
    gentlemenNote: 'Setelan Jas Formal, Beskap Modern, atau Batik Lengan Panjang bernuansa gelap/netral.',
    ladiesNote: 'Gaun Malam Anggun, Kebaya Kontemporer, atau Busana Formal dengan sentuhan warna palet.',
    colors: [
      { name: 'Champagne', hex: '#E6D7C3' },
      { name: 'Warm Taupe', hex: '#B8A392' },
      { name: 'Terracotta Rose', hex: '#C47D68' },
      { name: 'Olive Sage', hex: '#7A8471' },
      { name: 'Deep Espresso', hex: '#2C221E' },
    ],
  },
  digitalEnvelope: [
    {
      id: 'bca-1',
      bankName: 'BCA (Bank Central Asia)',
      accountNumber: '8831092831',
      accountHolder: 'Arya Satria Dananjaya',
      qrImageUrl: '/images/qris-sample.svg',
    },
    {
      id: 'mandiri-1',
      bankName: 'Bank Mandiri',
      accountNumber: '1270009823190',
      accountHolder: 'Kirana Larasati',
      qrImageUrl: '/images/qris-sample.svg',
    },
    {
      id: 'qris-1',
      bankName: 'QRIS All Payment',
      accountNumber: '00020101021126580014ID.LINKAJA.WWW',
      accountHolder: 'Arya & Kirana Wedding',
      qrImageUrl: '/images/qris-sample.svg',
    },
  ],
};

export const initialGuestbookEntries: GuestbookEntry[] = [
  {
    id: 'gb-1',
    guestName: 'Aditya Pratama, S.T.',
    attendance: 'hadir',
    pax: 2,
    message: 'Selamat untuk Arya dan Kirana! Semoga dilancarkan semua persiapannya hingga hari H dan menjadi keluarga sakinah, mawaddah, warahmah.',
    createdAt: '2026-10-14T10:15:00+07:00',
  },
  {
    id: 'gb-2',
    guestName: 'Dra. Retno Wulandari',
    attendance: 'hadir',
    pax: 2,
    message: 'Barakallah Kirana dan Arya. Senang sekali mendengar kabar gembira ini. Kami sekeluarga insya Allah hadir mendoakan langsung kedua mempelai.',
    createdAt: '2026-10-15T14:30:00+07:00',
  },
  {
    id: 'gb-3',
    guestName: 'Farhan & Maya',
    attendance: 'hadir',
    pax: 2,
    message: 'Akhirnya berlayar juga sahabat terbaik! Happy wedding, selamat menempuh fase hidup baru yang penuh dengan kebahagiaan dan berkah.',
    createdAt: '2026-10-16T09:00:00+07:00',
  },
  {
    id: 'gb-4',
    guestName: 'dr. Kevin Sanjaya',
    attendance: 'ragu',
    pax: 1,
    message: 'Selamat ya Arya & Kirana. Masih menyesuaikan jadwal dinas operasi di rumah sakit, semoga bisa menyempatkan hadir di resepsi nanti malam!',
    createdAt: '2026-10-17T18:45:00+07:00',
  },
];
