export interface FoodEntry {
  id: number;
  title: string;
  calorie: number;
  price: number;
  date: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthContextProviderProps {
  children: React.ReactNode;
}
