export const SIMPLE_ACTION: string = "SIMPLE_ACTION";

export function simpleAction() {
  return {
    type: SIMPLE_ACTION,
    payload: "my first action"
  };
}
