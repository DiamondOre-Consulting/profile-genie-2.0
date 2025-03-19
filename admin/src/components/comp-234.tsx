import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { useId, useState } from "react";

const frameworks: Option[] = [
  {
    text: "next.js",
    label: "Next.js",
  },
  {
    text: "sveltekit",
    label: "SvelteKit",
  },
  {
    text: "nuxt.js",
    label: "Nuxt.js",
    disable: true,
  },
  {
    text: "remix",
    label: "Remix",
  },
  {
    text: "astro",
    label: "Astro",
  },
  {
    text: "angular",
    label: "Angular",
  },
  {
    text: "vue",
    label: "Vue.js",
  },
  {
    text: "react",
    label: "React",
  },
  {
    text: "ember",
    label: "Ember.js",
  },
  {
    text: "gatsby",
    label: "Gatsby",
  },
  {
    text: "eleventy",
    label: "Eleventy",
    disable: true,
  },
  {
    text: "solid",
    label: "SolidJS",
  },
  {
    text: "preact",
    label: "Preact",
  },
  {
    text: "qwik",
    label: "Qwik",
  },
  {
    text: "alpine",
    label: "Alpine.js",
  },
  {
    text: "lit",
    label: "Lit",
  },
];


export default function MultipleCom() {

  const [frameworks, setFrameworks] = useState();

  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label>Multiselect</Label>
      <MultipleSelector
        commandProps={{
          label: "Select frameworks",
        }}
        options={frameworks}
        value={[{ id: "", text: "" }]}
        placeholder="Select frameworks"
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
      />
      <p className="text-zinc-500 mt-2 text-xs dark:text-zinc-400" role="region" aria-live="polite">
        Inspired by{""}
        <a
          className="hover:text-zinc-950 underline dark:hover:text-zinc-50"
          href="https://shadcnui-expansions.typeart.cc/docs/multiple-selector"
          target="_blank"
          rel="noopener nofollow"
        >
          shadcn/ui expansions
        </a>
      </p>
    </div>
  );
}
