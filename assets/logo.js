import * as React from "react"
import Svg, { Mask, Path, Defs, LinearGradient, Stop } from "react-native-svg"
const LogoComponent = (props) => (
    <Svg
      width={134}
      height={134}
      viewBox="0 0 134 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M133.926 67.192c0 36.798-29.829 66.628-66.627 66.628-36.797 0-66.627-29.83-66.627-66.627 0-17.16 6.841-33.079 17.497-44.89-1.238 12.725 1.944 25.989 8.836 35.356-1.193 3.853 0 5.288 0 9.533 0 22.743 17.552 40.472 40.294 40.472 22.742 0 40.471-17.73 40.471-40.472 0-12.138-5.782-23.037-14.138-30.574-29.043-26.194-62.778-.949-43.129 23.284 2.228 2.392 4.783 4.825 7.691 7.29-3.154-2.383-5.697-4.831-7.69-7.29-38.359-41.19 20.447-70.38 49.844-50.576 20.061 11.482 33.578 33.096 33.578 57.866z"
        fill="url(#paint0_linear_120_65)"
      />
      <Path
        d="M31.07 17.532C44.866-6.12 82.844.764 92.918 5.536 51.033-3.831 29.563 38.284 58.193 67.09L62.92 37.88v34.603l20.535 15.12-24.332-9.978C29.786 63.84 24.884 28.135 31.07 17.532z"
        fill="url(#paint1_linear_120_65)"
      />
      <Path
        d="M8.095 63.481c3.358 27.04 24.742 48.247 59.204 46.834 4.713-.354 15.907-2.843 24.248-10.477-4.769 3.667-15.058 7.826-24.248 7.826-22.742 0-40.294-17.73-40.294-40.472 0-4.245-.366-5.883 0-9.424-6.892-9.366-10.073-22.74-8.836-35.465C11.806 33.791 6.504 41.92 8.095 63.481z"
        fill="url(#paint2_linear_120_65)"
      />
      <Path
        d="M108.902 32.423c26.162 26.902 14.534 80.325-32.774 89.423-41.114 7.907-68.219-27.209-68.219-60.96 4.233 20.253 13.936 35.6 26.292 42.47 4.996 2.45 13.344 5.395 16.325 5.899 15.824 2.677 23.114.538 31.906-3.353 6.996-3.322 12.784-8.067 17.985-14.84 6.954-9.056 8.743-22.938 5.917-34.24-3.809-15.239-18.78-28.071-31.88-30.61-13.1-2.54-22.148.894-29.063 12.76 15.366-36.263 44.348-26.254 63.511-6.549z"
        fill="url(#paint3_linear_120_65)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_120_65"
          x1={17.886}
          y1={21.1305}
          x2={117.952}
          y2={109.6}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFCF53" />
          <Stop offset={0.494792} stopColor="#FF5995" />
          <Stop offset={1} stopColor="#5379FF" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_120_65"
          x1={98.8766}
          y1={62.2565}
          x2={23.3746}
          y2={3.96917}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFCF53" />
          <Stop offset={1} stopColor="#FF5995" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_120_65"
          x1={-44.9998}
          y1={-51.7153}
          x2={209.575}
          y2={177.692}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.0208333} stopColor="#FFCF52" />
          <Stop offset={0.671875} stopColor="#FF5995" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_120_65"
          x1={-17.6082}
          y1={-5.40066}
          x2={146.384}
          y2={105.185}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" stopOpacity={0.75} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
)
export default LogoComponent