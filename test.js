import test from 'tape'
import {remark} from 'remark'
import rubyLinks from './index.js'

test('rubyLinks', (t) => {
  t.equal(
    remark()
      .use(rubyLinks)
      .processSync(['[紳士](-へんたい)'].join(''))
      .toString(),
    ['<ruby>紳士<rp>(</rp><rt>へんたい</rt><rp>)</rp></ruby>\n'].join(
      '\n'
    ),
    'should work'
  )

  t.end()
})
