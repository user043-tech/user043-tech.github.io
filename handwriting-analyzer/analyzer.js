// Handwriting Script Analyzer - JavaScript Implementation

class WritingStyle {
    static CURSIVE = "cursive";
    static PRINT = "print";
    static ITALIC = "italic";
    static DECORATIVE = "decorative";
    static FRAKTUR = "fraktur";
}

class HandwritingAnalyzer {
    constructor() {
        this.characteristics = {
            slant_angle: 0,
            line_spacing: 1.0,
            letter_height: 1.0,
            letter_width: 1.0,
            pressure: 0.5,
            style: WritingStyle.PRINT
        };

        // Character maps for different styles
        this.styleMaps = {
            cursive: {
                'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇',
                'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋', 'k': '𝒌', 'l': '𝒍',
                'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓',
                's': '𝒔', 't': '𝒕', 'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙',
                'y': '𝒚', 'z': '𝒛',
                'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭',
                'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱', 'K': '𝑲', 'L': '𝑳',
                'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹',
                'S': '𝑺', 'T': '𝑻', 'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿',
                'Y': '𝒀', 'Z': '𝒁',
            },
            decorative: {
                'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯',
                'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵',
                'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻',
                's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁',
                'y': '𝔂', 'z': '𝔃',
                'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕',
                'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛',
                'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡',
                'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧',
                'Y': '𝓨', 'Z': '𝓩',
            },
            italic: {
                'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧',
                'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭',
                'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳',
                's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹',
                'y': '𝘺', 'z': '𝘻',
                'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍',
                'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓',
                'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙',
                'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟',
                'Y': '𝘠', 'Z': '𝘡',
            },
            fraktur: {
                'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣',
                'g': '𝔤', 'h': '𝔥', 'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩',
                'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯',
                's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵',
                'y': '𝔶', 'z': '𝔷',
                'A': '𝔄', 'B': '𝔅', 'C': '𝔆', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉',
                'G': '𝔊', 'H': '𝔋', 'I': '𝔍', 'J': '𝔎', 'K': '𝔏', 'L': '𝔐',
                'M': '𝔑', 'N': '𝔒', 'O': '𝔓', 'P': '𝔔', 'Q': '𝔕', 'R': '𝔖',
                'S': '𝔗', 'T': '𝔘', 'U': '𝔙', 'V': '𝔚', 'W': '𝔛', 'X': '𝔜',
                'Y': '𝔝', 'Z': '𝔞',
            },
            print: {}
        };
    }

    convertText(text, style) {
        const charMap = this.styleMaps[style] || {};
        let converted = "";

        for (let char of text) {
            converted += charMap[char] || char;
        }

        return converted;
    }

    analyzeHandwriting(text) {
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const uppercaseCount = (text.match(/[A-Z]/g) || []).length;
        const digitCount = (text.match(/[0-9]/g) || []).length;
        const spaceCount = text.split(' ').length - 1;

        return {
            text: text,
            length: text.length,
            characteristics: this.characteristics,
            uppercase_ratio: text.length > 0 ? uppercaseCount / text.length : 0,
            digit_ratio: text.length > 0 ? digitCount / text.length : 0,
            space_count: spaceCount,
            word_count: words.length,
            average_word_length: words.length > 0 ? words.reduce((sum, w) => sum + w.length, 0) / words.length : 0
        };
    }

    setCharacteristics(slant, spacing, height, width, pressure) {
        this.characteristics.slant_angle = slant;
        this.characteristics.line_spacing = spacing;
        this.characteristics.letter_height = height;
        this.characteristics.letter_width = width;
        this.characteristics.pressure = Math.max(0, Math.min(1, pressure));
    }
}

// UI Controller
class UIController {
    constructor() {
        this.analyzer = new HandwritingAnalyzer();
        this.currentStyle = WritingStyle.PRINT;
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // Input elements
        this.textInput = document.getElementById('textInput');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.copyBtn = document.getElementById('copyBtn');

        // Style buttons
        this.styleButtons = document.querySelectorAll('.style-btn');

        // Slider elements
        this.slantSlider = document.getElementById('slantSlider');
        this.spacingSlider = document.getElementById('spacingSlider');
        this.heightSlider = document.getElementById('heightSlider');
        this.widthSlider = document.getElementById('widthSlider');
        this.pressureSlider = document.getElementById('pressureSlider');

        // Output elements
        this.convertedOutput = document.getElementById('convertedOutput');
        this.analysisReport = document.getElementById('analysisReport');
        this.statisticsDisplay = document.getElementById('statistics');

        // Value display elements
        this.slantValue = document.getElementById('slantValue');
        this.spacingValue = document.getElementById('spacingValue');
        this.heightValue = document.getElementById('heightValue');
        this.widthValue = document.getElementById('widthValue');
        this.pressureValue = document.getElementById('pressureValue');

        // Characteristics display
        this.dispSlant = document.getElementById('dispSlant');
        this.dispSpacing = document.getElementById('dispSpacing');
        this.dispHeight = document.getElementById('dispHeight');
        this.dispWidth = document.getElementById('dispWidth');
        this.dispPressure = document.getElementById('dispPressure');
    }

    attachEventListeners() {
        // Style selection
        this.styleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.selectStyle(e));
        });

        // Sliders
        this.slantSlider.addEventListener('input', (e) => this.updateSlant(e));
        this.spacingSlider.addEventListener('input', (e) => this.updateSpacing(e));
        this.heightSlider.addEventListener('input', (e) => this.updateHeight(e));
        this.widthSlider.addEventListener('input', (e) => this.updateWidth(e));
        this.pressureSlider.addEventListener('input', (e) => this.updatePressure(e));

        // Buttons
        this.analyzeBtn.addEventListener('click', () => this.analyze());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());

        // Real-time statistics update
        this.textInput.addEventListener('input', () => this.updateStatistics());
    }

    selectStyle(e) {
        // Update active button
        this.styleButtons.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Update current style
        this.currentStyle = e.currentTarget.dataset.style;
        this.analyzer.characteristics.style = this.currentStyle;

        // Re-analyze if there's text
        if (this.textInput.value) {
            this.analyze();
        }
    }

    updateSlant(e) {
        const value = parseFloat(e.target.value);
        this.slantValue.textContent = value;
        this.dispSlant.textContent = value + '°';
        this.analyzer.setCharacteristics(
            value,
            this.analyzer.characteristics.line_spacing,
            this.analyzer.characteristics.letter_height,
            this.analyzer.characteristics.letter_width,
            this.analyzer.characteristics.pressure
        );
    }

    updateSpacing(e) {
        const value = parseFloat(e.target.value);
        this.spacingValue.textContent = value.toFixed(1);
        this.dispSpacing.textContent = value.toFixed(1);
        this.analyzer.setCharacteristics(
            this.analyzer.characteristics.slant_angle,
            value,
            this.analyzer.characteristics.letter_height,
            this.analyzer.characteristics.letter_width,
            this.analyzer.characteristics.pressure
        );
    }

    updateHeight(e) {
        const value = parseFloat(e.target.value);
        this.heightValue.textContent = value.toFixed(1);
        this.dispHeight.textContent = value.toFixed(1);
        this.analyzer.setCharacteristics(
            this.analyzer.characteristics.slant_angle,
            this.analyzer.characteristics.line_spacing,
            value,
            this.analyzer.characteristics.letter_width,
            this.analyzer.characteristics.pressure
        );
    }

    updateWidth(e) {
        const value = parseFloat(e.target.value);
        this.widthValue.textContent = value.toFixed(1);
        this.dispWidth.textContent = value.toFixed(1);
        this.analyzer.setCharacteristics(
            this.analyzer.characteristics.slant_angle,
            this.analyzer.characteristics.line_spacing,
            this.analyzer.characteristics.letter_height,
            value,
            this.analyzer.characteristics.pressure
        );
    }

    updatePressure(e) {
        const value = parseInt(e.target.value);
        const normalizedValue = value / 100;
        this.pressureValue.textContent = value;
        this.dispPressure.textContent = value + '%';
        this.analyzer.setCharacteristics(
            this.analyzer.characteristics.slant_angle,
            this.analyzer.characteristics.line_spacing,
            this.analyzer.characteristics.letter_height,
            this.analyzer.characteristics.letter_width,
            normalizedValue
        );
    }

    updateStatistics() {
        const text = this.textInput.value;
        const analysis = this.analyzer.analyzeHandwriting(text);

        document.getElementById('statLength').textContent = analysis.length;
        document.getElementById('statUppercase').textContent = (analysis.uppercase_ratio * 100).toFixed(1) + '%';
        document.getElementById('statDigits').textContent = (analysis.digit_ratio * 100).toFixed(1) + '%';
        document.getElementById('statSpaces').textContent = analysis.space_count;
        document.getElementById('statWords').textContent = analysis.word_count;
        document.getElementById('statAvgWord').textContent = analysis.average_word_length.toFixed(2);
    }

    analyze() {
        const text = this.textInput.value;

        if (!text.trim()) {
            alert('Bitte geben Sie einen Text ein!');
            return;
        }

        // Convert text
        const converted = this.analyzer.convertText(text, this.currentStyle);
        this.convertedOutput.textContent = converted;
        this.convertedOutput.classList.add('filled');

        // Analyze
        const analysis = this.analyzer.analyzeHandwriting(text);

        // Generate report
        this.displayAnalysisReport(analysis);

        // Update statistics
        this.updateStatistics();
    }

    displayAnalysisReport(analysis) {
        const report = `
            <ul>
                <li>
                    <span class="label">Originaltext:</span>
                    <span class="value">${this.escapeHtml(analysis.text)}</span>
                </li>
                <li>
                    <span class="label">Textlänge:</span>
                    <span class="value">${analysis.length} Zeichen</span>
                </li>
                <li>
                    <span class="label">Großbuchstaben:</span>
                    <span class="value">${(analysis.uppercase_ratio * 100).toFixed(1)}%</span>
                </li>
                <li>
                    <span class="label">Ziffern:</span>
                    <span class="value">${(analysis.digit_ratio * 100).toFixed(1)}%</span>
                </li>
                <li>
                    <span class="label">Leerzeichen:</span>
                    <span class="value">${analysis.space_count}</span>
                </li>
                <li>
                    <span class="label">Wörter:</span>
                    <span class="value">${analysis.word_count}</span>
                </li>
                <li>
                    <span class="label">Ø Wortlänge:</span>
                    <span class="value">${analysis.average_word_length.toFixed(2)}</span>
                </li>
            </ul>
        `;
        this.analysisReport.innerHTML = report;
    }

    copyToClipboard() {
        const text = this.convertedOutput.textContent;

        if (text === 'Konvertierter Text wird hier angezeigt...') {
            alert('Bitte führen Sie zunächst eine Analyse durch!');
            return;
        }

        navigator.clipboard.writeText(text).then(() => {
            this.showSuccessMessage('Text in Zwischenablage kopiert!');
        }).catch(err => {
            console.error('Fehler beim Kopieren:', err);
        });
    }

    showSuccessMessage(message) {
        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.textContent = message;
        document.body.appendChild(msg);

        setTimeout(() => msg.remove(), 2000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new UIController();
});
