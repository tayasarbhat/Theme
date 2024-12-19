export interface TimetableItem {
  id: string;
  time: string;
  activity: string;
}

export interface TimetableRowProps {
  item: TimetableItem;
  onChange: (newData: TimetableItem) => void;
  onDelete: () => void;
}