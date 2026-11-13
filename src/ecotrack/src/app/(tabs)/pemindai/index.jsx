import { router } from "expo-router";
import KameraView from "@/ui/pemindai/KameraView";

export default function PemindaiPage() {
  return (
    <KameraView
      onTutup={() => router.back()}
      onBukaDetail={(idSampah) =>
        router.push({ pathname: "/informasi/[idSampah]", params: { idSampah } })
      }
    />
  );
}