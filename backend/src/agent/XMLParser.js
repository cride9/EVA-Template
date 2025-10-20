const { JSDOM } = require('jsdom');

class XMLParser {
  static parse(xmlString) {
    // Wrap with a root element to ensure valid XML for parsing
    const wrappedXml = `<root>${xmlString}</root>`;
    
    try {
      const dom = new JSDOM(wrappedXml, { contentType: 'text/xml' });
      const parser = new dom.window.DOMParser();
      const doc = parser.parseFromString(wrappedXml, 'text/xml');

      const parseError = doc.querySelector('parsererror');
      if (parseError) {
        console.warn('XML parsing error. Falling back to regex.', parseError.textContent);
        return this.parseWithRegex(xmlString);
      }
      
      const thoughtNode = doc.querySelector('thought');
      const thought = thoughtNode ? thoughtNode.textContent.trim() : 'No thought found.';
      
      const toolCallNodes = doc.querySelectorAll('tool_call');
      const toolCalls = Array.from(toolCallNodes).map(node => {
        const name = node.getAttribute('name');
        const args = {};
        for (const child of node.children) {
          args[child.tagName.toLowerCase()] = child.textContent.trim();
        }
        return { name, args };
      });
      
      return { thought, toolCalls };
    } catch (e) {
      console.warn('DOMParser failed. Falling back to regex.', e.message);
      return this.parseWithRegex(xmlString);
    }
  }
  
  // Fallback for malformed XML which LLMs often produce
  static parseWithRegex(text) {
    const thoughtRegex = /<thought>([\s\S]*?)<\/thought>/;
    const thoughtMatch = text.match(thoughtRegex);
    const thought = thoughtMatch ? thoughtMatch[1].trim() : "Couldn't parse thought.";
    
    const toolCallRegex = /<tool_call name="([^"]+)">([\s\S]*?)<\/tool_call>/g;
    const toolCalls = [];
    let match;
    while ((match = toolCallRegex.exec(text)) !== null) {
      const name = match[1];
      const inner = match[2];
      const args = {};
      const argRegex = /<([^>]+)>([\s\S]*?)<\/\1>/g;
      let argMatch;
      while ((argMatch = argRegex.exec(inner)) !== null) {
        args[argMatch[1].toLowerCase()] = argMatch[2].trim();
      }
      toolCalls.push({ name, args });
    }
    
    return { thought, toolCalls };
  }
}

module.exports = XMLParser;