import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "centered-message",
  styleUrl: "centered-message.css",
  shadow: true,
})
export class CenteredMessage {
  render() {
    return (
      <Host>
        <slot name="icon"></slot>
        <slot></slot>
      </Host>
    );
  }
}
