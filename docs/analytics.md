# Analytics setup

The site loads one thing: PMG's existing Google Tag Manager container, `GTM-KNQXQ7K`.
GA4 and Microsoft Clarity are tags inside that container. There is no Meta Pixel.

The container loads only on the indexable production site (`NEXT_PUBLIC_INDEXABLE=true`),
so preview and review traffic never reaches PMG's reports. To test tags on a preview
deployment, set `NEXT_PUBLIC_ANALYTICS_DEBUG=true` there and use GTM Preview mode.

## What the live site does today (crawl of 2026-09-24)

- `GTM-KNQXQ7K` is installed by the Site Kit plugin, but its published version contains
  **no tags**. It loads and does nothing.
- GA4 comes from two hard-coded gtag.js snippets, not from GTM:
  - `G-5JJ8KNE4RS`, in the theme header.
  - `G-BY22K2YH53`, added by Site Kit.
- No Clarity and no Meta Pixel.

## Container changes required before launch

Someone with Publish access to `GTM-KNQXQ7K` makes these changes. Without them the new site
reports nothing, because the container is empty.

1. **GA4, both properties:** add two *Google tag* tags, one with tag ID `G-5JJ8KNE4RS` and
   one with `G-BY22K2YH53`, each triggered on *Initialization - All Pages*. Both properties
   keep receiving data after cutover, so historical reporting continues in each. PMG will
   pick one to keep; after that, pause the other tag and publish.
2. **Clarity:** create a Clarity project for painmgmtgroup.com, then add Clarity to GTM, either
   with the *Microsoft Clarity - Official* community template or a Custom HTML tag holding the
   Clarity snippet, triggered on *All Pages*.
3. Preview against a deployment that has `NEXT_PUBLIC_ANALYTICS_DEBUG=true`, then publish.

## Launch check

After DNS moves: GTM Preview shows all three tags firing on page view, Realtime in each GA4
property shows the visit, and Clarity shows a recording within about two hours.
