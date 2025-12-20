/**
 * @import {Root} from 'mdast'
 */

// https://github.com/micromark/micromark-extension-directive#syntax

import { h } from "hastscript";
import { visit } from "unist-util-visit";

// This plugin is an example to let users write HTML with directives.
export function remarkDirectiveToHTML() {
  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, function (node) {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes || {});

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
}
