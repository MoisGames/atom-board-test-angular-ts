interface Bubble {
    x: number;
    y: number; 
    r: number; 
}


interface BubbleDateEntry {
    [date: string]: Bubble[];
}

export interface BubbleDataArray extends Array<BubbleDateEntry> {}