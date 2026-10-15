import os
from fontTools.ttLib import TTFont
from fontTools.ttLib.woff2 import compress

TARGET_DIR = r"D:\[0925]홍천군청 열린군수실\backup_site\site\mayor2026\font"

def convert_fonts(folder):
    for root, _, files in os.walk(folder):
        for file in files:
            ext = os.path.splitext(file)[1].lower()

            # ✅ ttf + otf 둘 다 허용
            if ext not in (".ttf", ".otf"):
                continue

            font_path = os.path.join(root, file)

            base = os.path.splitext(font_path)[0]
            woff_path = base + ".woff"
            woff2_path = base + ".woff2"

            try:
                # =================
                # WOFF2
                # =================
                if not os.path.exists(woff2_path):
                    compress(font_path, woff2_path)
                    print(f"✅ WOFF2 생성: {file}")

                # =================
                # WOFF
                # =================
                if not os.path.exists(woff_path):
                    font = TTFont(font_path)
                    font.flavor = "woff"
                    font.save(woff_path)
                    print(f"✅ WOFF 생성: {file}")

            except Exception as e:
                print(f"❌ 실패: {file} → {e}")

if __name__ == "__main__":
    print("🚀 폰트 변환 시작")
    convert_fonts(TARGET_DIR)
    print("🎉 모든 변환 완료")
