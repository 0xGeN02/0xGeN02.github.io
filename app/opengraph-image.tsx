import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";


export const dynamic = "force-static";
export const alt = "0xGeN02 terminal banner";
export const size = { width: 1200, height: 420 };
export const contentType = "image/png";

const BANNER_EN = `
  
  █  █████╗ ██╗  ██╗ ██████╗ ███████╗███╗   ██╗ ██████╗ ██████╗ 
 ██╔═████╗╚██╗██╔╝██╔════╝ ██╔════╝████╗ ██║ ██╔═████╗╚════██╗
 ██║██╔██║ ╚███╔╝ ██║  ███╗█████╗  ██╔██╗ ██║██║██╔██║ █████╔╝
 ████╔╝██║ ██╔██╗ ██║   ██║██╔══╝  ██║╚██╗██║████╔╝██║██╔═══╝ 
 ╚██████╔╝██╔╝ ██╗╚██████╔╝███████╗██║ ╚████║╚██████╔╝███████╗
  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝
`.trim();

export default async function Image() {
  const mono = await readFile(
    join(process.cwd(), "public/fonts/JetBrainsMono-Regular.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 60px",
          background: "#11111b",
          color: "#cba6f7",
          whiteSpace: "pre",
          fontFamily: "font-mono"
        }}
        >
        <div
          style={{
            whiteSpace: "pre",
            lineHeight: 1.05,
            fontSize: 28,
            letterSpacing: 0,
            fontFeatureSettings: '"liga" 0, "calt" 0',
          }}
        >
          {BANNER_EN}
        </div>
        <div
          style={{
            marginTop: 18,
            marginLeft: 20,
            paddingLeft: 20,
            color: "#6c7086",
            fontSize: 24,
          }}
        >
          BTC Maxi · Machine Unlearning · I use Arch BTW
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "JetBrainsMono",
          data: mono,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}