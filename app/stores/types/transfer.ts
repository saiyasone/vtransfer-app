export interface AppState {
  count: number;
  meta: number;
  increase: () => void;
  decrese: () => void;
  reset?: () => void;
}
