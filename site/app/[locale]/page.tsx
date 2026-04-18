import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import SceneEntry from "@/components/scenes/SceneEntry";
import SceneResistance from "@/components/scenes/SceneResistance";
import SceneShift from "@/components/scenes/SceneShift";
import SceneInnovation from "@/components/scenes/SceneInnovation";
import SceneFoundation from "@/components/scenes/SceneFoundation";
import SceneRoadmap from "@/components/scenes/SceneRoadmap";
import ScenePartnership from "@/components/scenes/ScenePartnership";
import SceneResources from "@/components/scenes/SceneResources";
import SceneClosing from "@/components/scenes/SceneClosing";
import JsonLd from "@/components/system/JsonLd";

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const l = locale as Locale;

  return (
    <>
      <JsonLd locale={l} dict={dict} />
      <SceneEntry dict={dict} locale={l} />
      <SceneResistance dict={dict} />
      <SceneShift dict={dict} />
      <SceneInnovation dict={dict} />
      <SceneFoundation dict={dict} />
      <SceneRoadmap dict={dict} />
      <ScenePartnership dict={dict} />
      <SceneResources dict={dict} />
      <SceneClosing dict={dict} />
    </>
  );
}
