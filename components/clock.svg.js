import * as React from 'react';
import { SvgXml } from 'react-native-svg';
const xml = `<svg version="1.1" class="loading-icon__svg iconic-clock" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 384 384" xml:space="preserve">
<g>
  <circle class="iconic-clock-frame" cx="192" cy="192" r="172" fill="#ffffff" stroke="#000000" stroke-width="35">
  </circle>
  <line class="iconic-clock-hour-hand" id="iconic-anim-clock-hour-hand" fill="none" stroke="#000000" stroke-width="20" stroke-miterlimit="10" x1="192" y1="192" x2="192" y2="87.5" />
  <line class="iconic-clock-minute-hand" id="iconic-anim-clock-minute-hand" fill="none" stroke="#000000" stroke-width="20" stroke-miterlimit="10" x1="192" y1="192" x2="192" y2="54" />
  <circle class="iconic-clock-axis" cx="192" cy="192" r="15" />
</g>
<defs>
  <animateTransform type="rotate" fill="remove" restart="always" calcMode="linear" accumulate="none" additive="sum" xlink:href="#iconic-anim-clock-hour-hand" repeatCount="indefinite" dur="12s" to="360 192 192" from="0 192 192" attributeName="transform" attributeType="xml">
  </animateTransform>
  <animateTransform type="rotate" fill="remove" restart="always" calcMode="linear" accumulate="none" additive="sum" xlink:href="#iconic-anim-clock-minute-hand" repeatCount="indefinite" dur="4s" to="360 192 192" from="0 192 192" attributeName="transform" attributeType="xml">
  </animateTransform>
</defs>
</svg>`

export default function AnimatedClock() {
    return (
        <SvgXml xml={xml} width="100%" height="100%" style={{width: 200, height: 200}}/>
    )
}