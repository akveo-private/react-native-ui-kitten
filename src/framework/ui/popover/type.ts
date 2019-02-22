export class Point {

  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static zero(): Point {
    return new Point(0, 0);
  }
}

export class Size {

  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  static zero(): Size {
    return new Size(0, 0);
  }
}

export class Frame {

  readonly origin: Point;
  readonly size: Size;

  constructor(x: number, y: number, width: number, height: number) {
    this.origin = new Point(x, y);
    this.size = new Size(width, height);
  }

  /**
   * Creates new frame aligned to left of other
   */
  public leftOf(other: Frame): Frame {
    return new Frame(
      other.origin.x - this.size.width,
      this.origin.y,
      this.size.width,
      this.size.height,
    );
  }

  /**
   * Creates new frame aligned to top of other
   */
  public topOf(other: Frame): Frame {
    return new Frame(
      this.origin.x,
      other.origin.y - this.size.height,
      this.size.width,
      this.size.height,
    );
  }

  /**
   * Creates new frame aligned to right of other
   */
  public rightOf(other: Frame): Frame {
    return new Frame(
      other.origin.x + other.size.width,
      this.origin.y,
      this.size.width,
      this.size.height,
    );
  }

  /**
   * Creates new frame aligned to bottom of other
   */
  public bottomOf(other: Frame): Frame {
    return new Frame(
      this.origin.x,
      other.origin.y + other.size.height,
      this.size.width,
      this.size.height,
    );
  }

  /**
   * Creates new frame centered horizontally to other
   */
  public centerHorizontalOf(other: Frame): Frame {
    return new Frame(
      other.origin.x + (other.size.width - this.size.width) / 2,
      this.origin.y,
      this.size.width,
      this.size.height,
    );
  }

  /**
   * Creates new frame centered vertically to other
   */
  public centerVerticalOf(other: Frame): Frame {
    return new Frame(
      this.origin.x,
      other.origin.y + (other.size.height - this.size.height) / 2,
      this.size.width,
      this.size.height,
    );
  }

  static zero(): Frame {
    return Frame.from(Point.zero(), Size.zero());
  }

  static from(point: Point, size: Size): Frame {
    return new Frame(point.x, point.y, size.width, size.height);
  }
}

export interface Placement {
  rawValue: string;

  frame(source: Frame, other: Frame): Frame;

  flex(): FlexPlacement;

  parent(): Placement;

  reverse(): Placement;
}

export interface FlexPlacement {
  direction: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  alignment: 'flex-start' | 'flex-end' | 'center';
}

export class Placements {

  static LEFT: Placement = new class implements Placement {
    rawValue: string = 'left';

    frame(source: Frame, other: Frame): Frame {
      return source.leftOf(other).centerVerticalOf(other);
    }

    flex(): FlexPlacement {
      return {
        direction: 'row',
        alignment: 'center',
      };
    }

    parent(): Placement {
      return this;
    }

    reverse(): Placement {
      return Placements.RIGHT;
    }
  };

  static LEFT_START: Placement = new class implements Placement {
    rawValue: string = 'left start';

    frame(source: Frame, other: Frame): Frame {
      const { origin, size } = this.parent().frame(source, other);

      return new Frame(
        origin.x,
        origin.y - (other.size.height - size.height) / 2,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'row',
        alignment: 'flex-start',
      };
    }

    parent(): Placement {
      return Placements.LEFT;
    }

    reverse(): Placement {
      return Placements.RIGHT_START;
    }
  };

  static LEFT_END: Placement = new class implements Placement {
    rawValue = 'left end';

    frame(source: Frame, other: Frame): Frame {
      const { origin, size } = this.parent().frame(source, other);

      return new Frame(
        origin.x,
        origin.y + (other.size.height - size.height) / 2,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'row',
        alignment: 'flex-end',
      };
    }

    parent(): Placement {
      return Placements.LEFT;
    }

    reverse(): Placement {
      return Placements.RIGHT_END;
    }
  };

  static TOP: Placement = new class implements Placement {
    rawValue = 'top';

    frame(source: Frame, other: Frame): Frame {
      return source.topOf(other).centerHorizontalOf(other);
    }

    flex(): FlexPlacement {
      return {
        direction: 'column',
        alignment: 'center',
      };
    }

    parent(): Placement {
      return this;
    }

    reverse(): Placement {
      return Placements.BOTTOM;
    }
  };

  static TOP_START: Placement = new class implements Placement {
    rawValue = 'top start';

    frame(source: Frame, other: Frame): Frame {
      const { origin, size } = this.parent().frame(source, other);

      return new Frame(
        origin.x - (other.size.width - size.width) / 2,
        origin.y,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'column',
        alignment: 'flex-start',
      };
    }

    parent(): Placement {
      return Placements.TOP;
    }

    reverse(): Placement {
      return Placements.BOTTOM_START;
    }
  };

  static TOP_END: Placement = new class implements Placement {
    rawValue = 'top end';

    frame(source: Frame, other: Frame): Frame {
      const { origin, size } = this.parent().frame(source, other);

      return new Frame(
        origin.x + (other.size.width - size.width) / 2,
        origin.y,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'column',
        alignment: 'flex-end',
      };
    }

    parent(): Placement {
      return Placements.TOP;
    }

    reverse(): Placement {
      return Placements.BOTTOM_END;
    }
  };

  static RIGHT: Placement = new class implements Placement {
    rawValue = 'right';

    frame(source: Frame, other: Frame): Frame {
      return source.rightOf(other).centerVerticalOf(other);
    }

    flex(): FlexPlacement {
      return {
        direction: 'row-reverse',
        alignment: 'center',
      };
    }

    parent(): Placement {
      return this;
    }

    reverse(): Placement {
      return Placements.LEFT;
    }
  };

  static RIGHT_START: Placement = new class implements Placement {
    rawValue = 'right start';

    frame(source: Frame, other: Frame): Frame {
      const { origin, size } = this.parent().frame(source, other);

      return new Frame(
        origin.x,
        origin.y - (other.size.height - size.height) / 2,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'row-reverse',
        alignment: 'flex-start',
      };
    }

    parent(): Placement {
      return Placements.RIGHT;
    }

    reverse(): Placement {
      return Placements.LEFT_START;
    }
  };

  static RIGHT_END: Placement = new class implements Placement {
    rawValue = 'right end';

    frame(source: Frame, other: Frame): Frame {
      const { origin, size } = this.parent().frame(source, other);

      return new Frame(
        origin.x,
        origin.y + (other.size.height - size.height) / 2,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'row-reverse',
        alignment: 'flex-end',
      };
    }

    parent(): Placement {
      return Placements.RIGHT;
    }

    reverse(): Placement {
      return Placements.LEFT_END;
    }
  };

  static BOTTOM: Placement = new class implements Placement {
    rawValue = 'bottom';

    frame(source: Frame, other: Frame): Frame {
      return source.bottomOf(other).centerHorizontalOf(other);
    }

    flex(): FlexPlacement {
      return {
        direction: 'column-reverse',
        alignment: 'center',
      };
    }

    parent(): Placement {
      return this;
    }

    reverse(): Placement {
      return Placements.TOP;
    }
  };

  static BOTTOM_START: Placement = new class implements Placement {
    rawValue = 'bottom start';

    frame(source: Frame, other: Frame): Frame {
      const { origin, size } = this.parent().frame(source, other);

      return new Frame(
        origin.x - (other.size.width - size.width) / 2,
        origin.y,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'column-reverse',
        alignment: 'flex-start',
      };
    }

    parent(): Placement {
      return Placements.BOTTOM;
    }

    reverse(): Placement {
      return Placements.TOP_START;
    }
  };

  static BOTTOM_END: Placement = new class implements Placement {
    rawValue = 'bottom end';

    frame(source: Frame, other: Frame): Frame {
      const { origin, size } = this.parent().frame(source, other);

      return new Frame(
        origin.x + (other.size.width - size.width) / 2,
        origin.y,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'column-reverse',
        alignment: 'flex-end',
      };
    }

    parent(): Placement {
      return Placements.BOTTOM;
    }

    reverse(): Placement {
      return Placements.TOP_END;
    }
  };

  static parse(value: string | Placement, fallback?: Placement): Placement | undefined {
    return Placements.typeOf(value) ? value : Placements.parseString(value, fallback);
  }

  private static parseString(rawValue: string, fallback?: Placement): Placement | undefined {
    switch (rawValue) {
      case Placements.LEFT.rawValue:
        return Placements.LEFT;
      case Placements.TOP.rawValue:
        return Placements.TOP;
      case Placements.RIGHT.rawValue:
        return Placements.RIGHT;
      case Placements.BOTTOM.rawValue:
        return Placements.BOTTOM;
      case Placements.LEFT_START.rawValue:
        return Placements.LEFT_START;
      case Placements.LEFT_END.rawValue:
        return Placements.LEFT_END;
      case Placements.TOP_START.rawValue:
        return Placements.TOP_START;
      case Placements.TOP_END.rawValue:
        return Placements.TOP_END;
      case Placements.RIGHT_START.rawValue:
        return Placements.RIGHT_START;
      case Placements.RIGHT_END.rawValue:
        return Placements.RIGHT_END;
      case Placements.BOTTOM_START.rawValue:
        return Placements.BOTTOM_START;
      case Placements.BOTTOM_END.rawValue:
        return Placements.BOTTOM_END;
      default:
        return fallback;
    }
  }

  private static typeOf(value: any): value is Placement {
    const { rawValue } = (<Placement>value);

    return rawValue !== undefined;
  }
}
