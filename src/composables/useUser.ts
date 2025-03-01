import { ref } from "nativescript-vue";

export function useUser() {
  const user = ref({ name: "John Doe" });

  return {
    user,
  };
}
