---
title: "Co s HTMX?"
description: "Na co je nám vlastně HTMX?"
date: "2023-24-11"
image: "/assets/htmx-blog.png"
ready: false
---

HTMX, zkratka pro HTML eXtended, je maličká knihovna (14kB), která před pár měsíci strhla pozornost prakticky celého tech Twitteru svým neobvyklým přístupem k renderování, posílání informací, [tweetování](https://twitter.com/htmx_org) a obecně psaní webu. Dopředu řeknu, že po HTMX bych v reálných projektech s největší pravděpodobností nesahal a že si doteď nejsem úplně jistý tím, jestli je to vůbec možné, ale stejně jsem za její existenci jako vývojář-samouk neskutečně rád.

## Co je vlastně HTMX?

Popsat HTMX je trochu složité, protože sice jde o knihovnu psanou v JavaScriptu, ale nejde o JavaScriptovou knihovnu se stejném smyslu slova, jako je například React nebo Vue. "Akce" tu totiž neprobíhá v JS, TS nebo TSX souborech, ale přímo v HTML. HTMX je soubor atributů, co upravují jejich fungování, aniž by se musely jakkoliv zaměřovat přes selektory a jejich fortel je komunikace se serverem.

```html
<button
  hx-post="/clicked"
  hx-trigger="click"
  hx-target="#parent-div"
  hx-swap="outerHTML"
>
  Click Me!
</button>
```
