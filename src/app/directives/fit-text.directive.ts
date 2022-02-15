import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from "@angular/core";

@Directive({
  selector: "[fittext]",
})
export class FittextDirective implements AfterViewInit, OnInit, OnChanges {
  @Input() fittext: any;
  @Input() compression? = 1;
  @Input() activateOnResize? = true;
  @Input() minFontSize?: number | "inherit" = 0;
  @Input() maxFontSize?: number | "inherit" = Number.POSITIVE_INFINITY;
  @Input() delay? = 100;
  @Input() innerHTML: any;
  @Input() fontUnit?: "px" | "em" | string = "px";

  private fittextParent!: HTMLElement;
  private fittextElement!: HTMLElement;
  private fittextMinFontSize!: number;
  private fittextMaxFontSize!: number;
  private computed!: CSSStyleDeclaration;
  private newlines!: number;
  private lineHeight!: string;
  private display!: string;
  private calcSize = 50;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    setTimeout(() => {
      this.fittextElement = el.nativeElement;
      this.fittextParent = this.fittextElement.parentElement as any;
      this.computed = window.getComputedStyle(this.fittextElement);
      this.newlines =
        this.fittextElement.childElementCount > 0
          ? this.fittextElement.childElementCount
          : 1;
      this.lineHeight = (this.computed as any)["line-height"];
      this.display = this.computed["display"];
    });
  }

  @HostListener("window:resize")
  public onWindowResize = (): void => {
    if (this.activateOnResize) {
      this.setFontSize();
    }
  };

  public ngOnInit() {
    this.fittextMinFontSize =
      this.minFontSize === "inherit"
        ? (this.computed as any)["font-size"]
        : this.minFontSize;
    this.fittextMaxFontSize =
      this.maxFontSize === "inherit"
        ? (this.computed as any)["font-size"]
        : this.maxFontSize;
  }

  public ngAfterViewInit() {
    this.setFontSize(0);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes["compression"] && !changes["compression"].firstChange) {
      this.setFontSize(0);
    }
    if (changes["innerHTML"]) {
      this.fittextElement.innerHTML = this.innerHTML;
      if (!changes["innerHTML"].firstChange) {
        this.setFontSize(0);
      }
    }
  }

  private setFontSize = (delay: number = this.delay as number): void => {
    setTimeout(
      (() => {
        if (
          this.fittextElement.offsetHeight * this.fittextElement.offsetWidth !==
          0
        ) {
          // reset to default
          this.setStyles(this.calcSize, 1, "inline-block");
          // set new
          this.setStyles(
            this.calculateNewFontSize(),
            this.lineHeight,
            this.display
          );
        }
      }).bind(this),
      delay
    );
  };

  private calculateNewFontSize = (): number => {
    const ratio =
      (this.calcSize * this.newlines) /
      this.fittextElement.offsetWidth /
      this.newlines;

    return Math.max(
      Math.min(
        (this.fittextParent.offsetWidth -
          (parseFloat(getComputedStyle(this.fittextParent).paddingLeft) +
            parseFloat(getComputedStyle(this.fittextParent).paddingRight)) -
          6) *
          ratio *
          (this.compression ?? 0),
        this.fittextMaxFontSize
      ),
      this.fittextMinFontSize
    );
  };

  private setStyles = (
    fontSize: number,
    lineHeight: number | string,
    display: string
  ): void => {
    this.renderer.setStyle(
      this.fittextElement,
      "fontSize",
      fontSize.toString() + this.fontUnit
    );
    this.renderer.setStyle(
      this.fittextElement,
      "lineHeight",
      lineHeight.toString()
    );
    this.renderer.setStyle(this.fittextElement, "display", display);
  };
}
