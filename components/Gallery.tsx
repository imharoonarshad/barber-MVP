import { getShop } from "@/lib/shop";
import SectionHeading from "./SectionHeading";
import { RevealStagger, RevealItem } from "./Reveal";

export default function Gallery({
  limit,
  withHeading = true,
  preview = false,
}: {
  limit?: number;
  withHeading?: boolean;
  preview?: boolean;
}) {
  const shop = getShop();
  const images = limit ? shop.gallery.slice(0, limit) : shop.gallery;
  return (
    <section className="section">
      <div className="container-px">
        {withHeading && (
          <SectionHeading
            eyebrow="The work"
            title="Fresh from the chair"
            subtitle="A look inside the shop and a few of our favourite finishes."
            cta={preview ? { href: "/gallery", label: "View gallery" } : undefined}
          />
        )}
        <RevealStagger
          className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 ${
            withHeading ? "mt-12" : ""
          }`}
        >
          {images.map((src, i) => (
            <RevealItem
              key={src + i}
              className={
                i === 0 && !preview ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""
              }
            >
              <div className="group relative h-full overflow-hidden rounded-2xl">
                <img
                  src={src}
                  alt={`${shop.shortName} gallery ${i + 1}`}
                  className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
