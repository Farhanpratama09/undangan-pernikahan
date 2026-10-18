export type ThemeId = 'editorial' | 'dark-luxe' | 'heritage';

export interface PersonProfile {
  fullName: string;
  nickname: string;
  fatherName: string;
  motherName: string;
  instagramHandle: string;
  photoUrl: string;
}

export interface EventDetail {
  title: string;
  dateISO: string; // e.g., "2026-12-12T08:00:00+07:00"
  endTimeISO: string;
  timezoneLabel: 'WIB' | 'WITA' | 'WIT';
  description: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrImageUrl?: string;
}

export interface GuestbookEntry {
  id: string;
  guestName: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  pax: number;
  message: string;
  createdAt: string;
}

export interface RundownItem {
  time: string;
  title: string;
  description: string;
  iconType: 'arrival' | 'rings' | 'camera' | 'dinner' | 'music';
}

export interface DressCodeColor {
  name: string;
  hex: string;
}

export interface DressCodeInfo {
  title: string;
  description: string;
  gentlemenNote: string;
  ladiesNote: string;
  colors: DressCodeColor[];
}

export interface WeddingInvitationData {
  id: string;
  slug: string;
  themeId: ThemeId;
  isPortfolioDemo: boolean;
  couple: {
    groom: PersonProfile;
    bride: PersonProfile;
  };
  events: {
    akad: EventDetail;
    reception: EventDetail;
  };
  location: {
    venueName: string;
    fullAddress: string;
    landmarkNotes: string;
    visualMapAssetUrl: string;
    venueSketchUrl: string;
    venueTags: string[];
    coordinates: {
      lat: number;
      lng: number;
    };
    googleMapsPlaceId?: string;
  };
  audio: {
    srcUrl: string;
    title: string;
    artist: string;
  };
  gallery: string[];
  loveStory: Array<{
    year: string;
    title: string;
    story: string;
  }>;
  rundown: RundownItem[];
  dressCode: DressCodeInfo;
  digitalEnvelope: BankAccount[];
}

export interface ThemeProps {
  data: WeddingInvitationData;
  guestName: string;
  viewMode?: 'mobile' | 'desktop';
  initialGuestbookEntries?: GuestbookEntry[];
  isPlayingAudio?: boolean;
  onTogglePlayAudio?: () => void;
}
