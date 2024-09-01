from fasthtml.common import fast_app, FastHTML, Link

headers: tuple = (Link(rel='stylesheet', href='/assets/styles.css', type='text/css'),)
app: FastHTML
app, _ = fast_app(static_path='/assets', hdrs=headers, debug=True)


# static_path='assets', 