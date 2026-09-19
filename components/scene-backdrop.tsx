import { withBasePath } from "@/lib/base-path";

export function SceneBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet={withBasePath("/krishna-gita-mobile.png")}
        />
        <img
          src={withBasePath("/krishna-gita-desktop.png")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_top] sm:object-[left_center]"
        />
      </picture>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.97_0.02_82/0.42)_0%,oklch(0.97_0.018_82/0.72)_38%,oklch(0.97_0.016_82/0.9)_100%)] sm:bg-[linear-gradient(90deg,oklch(0.97_0.02_82/0.28)_0%,oklch(0.97_0.018_82/0.62)_42%,oklch(0.97_0.016_82/0.86)_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_55%,oklch(0.98_0.012_88/0.55),transparent_72%)]" />
    </div>
  );
}
