/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Definition} Definition
 * @typedef {import('mdast').HTML} HTML
 */

 import {visit, SKIP} from 'unist-util-visit'

 const own = {}.hasOwnProperty
 
 /**
  * Plugin to transform links and images into references and definitions.
  *
  * @type {import('unified').Plugin<void[], Root>}
  */
 export default function remarkReferenceLinks() {
   return (tree) => {
     // Transform normal links and images into references and definitions, replaces
     // the current node, and adds a definition if needed.
     visit(tree, (node, index, parent) => {
       if (
         parent &&
         typeof index === 'number' &&
         (node.type === 'link' && node.url.startsWith('-'))
       ) {
         const ruby = node.url.slice(1)
         const children = node.children
         // @ts-ignore
         const text = children.map(({ value }) => value).join('')

         /** @type {HTML} */
         const replacement = {
           type: 'html',
           value: `<ruby>${text}<rp>(</rp><rt>${ruby}</rt><rp>)</rp></ruby>`
         }
 
         parent.children[index] = replacement
         return [SKIP, index]
       }
     })
   }
 }
 