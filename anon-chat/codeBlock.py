def codeBlock(html):
    while "<python>" in html:
        after = html.split("</python>", 1)
        del after[0]
        html = html.split("<python>", 1)
        index = 0
        for text in html:
            index += 1
            if "</python>" in text:
                text = text
                break
        text = text.split("</python>")
        text = "<pre><code class='python'>" + text[0] + "</code></pre>"
        html[index - 1] = text
        html = "".join(html) + "".join(after)
    html = html.replace("<", "&lt;")
    html = html.replace(">", "&gt;")
    html = html.replace("&lt;pre&gt;", "<pre>")
    html = html.replace("&lt;/pre&gt;", "</pre>")
    html = html.replace("&lt;code class='python'&gt;", "<code class='python'>")
    html = html.replace("&lt;/code&gt;", "</code>")
    return html