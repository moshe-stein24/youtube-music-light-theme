#!/usr/bin/env python3
"""
SVG to PNG converter for YouTube Music Extension icons
Requires: pip install cairosvg
"""

try:
    import cairosvg
    import os
    
    def convert_svg_to_png(svg_file, png_file, size):
        """Convert SVG file to PNG with specified size"""
        try:
            cairosvg.svg2png(
                url=svg_file,
                write_to=png_file,
                output_width=size,
                output_height=size
            )
            print(f"✓ Created {png_file}")
        except Exception as e:
            print(f"✗ Error creating {png_file}: {e}")
    
    def main():
        # Get current directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        
        # Define icon sizes and files
        icons = [
            ("icon16.svg", "icon16.png", 16),
            ("icon48.svg", "icon48.png", 48),
            ("icon128.svg", "icon128.png", 128)
        ]
        
        print("Converting SVG icons to PNG...")
        
        for svg_name, png_name, size in icons:
            svg_path = os.path.join(current_dir, svg_name)
            png_path = os.path.join(current_dir, png_name)
            
            if os.path.exists(svg_path):
                convert_svg_to_png(svg_path, png_path, size)
            else:
                print(f"✗ SVG file not found: {svg_path}")
        
        print("\nConversion complete!")
        print("You can now delete the SVG files and this Python script.")
        
except ImportError:
    print("CairoSVG not installed.")
    print("Install it with: pip install cairosvg")
    print("Or use the convert_icons.html file in your browser instead.")

if __name__ == "__main__":
    main()
