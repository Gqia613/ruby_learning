const questions = {
    // セット1: メソッド定義・モジュール・クラス基礎（Q1-Q10）
    set1: [
        {
            question: "Stackクラスでpushとpopメソッドを動的に定義する方法として正しいものをすべて選んでください。",
            code: `class Stack
  def initialize
    @contents = []
  end
  __(1)__
end`,
            choices: [
                '<pre class="choice-code">[:push, :pop].each do |name|\n  define_method(name) do |*args|\n    @contents.send(name, *args)\n  end\nend</pre>',
                '<pre class="choice-code">for name in [:push, :pop]\n  define_method(name) do |*args|\n    @contents.send(name, *args)\n  end\nend</pre>',
                '<pre class="choice-code">[:push, :pop].each do |name|\n  instance_eval(&lt;&lt;-EOF)\n    def #{name}(*args)\n      @contents.send(:#{name}, *args)\n    end\n  EOF\nend</pre>',
                '<pre class="choice-code">[:push, :pop].each do |name|\n  class_eval(&lt;&lt;-EOF)\n    def #{name}(*args)\n      @contents.send(:#{name}, *args)\n    end\n  EOF\nend</pre>'
            ],
            correct: [0, 3],
            explanation: "<code>each</code>はブロックスコープを作るため変数<code>name</code>が正しくキャプチャされます。<code>class_eval</code>内の<code>def</code>はインスタンスメソッドを定義します。<code>for</code>はスコープを作らないため変数共有の問題があり、<code>instance_eval</code>内の<code>def</code>は特異メソッドになるため不適切です。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `module I; end
module P; end
class C
  include I
  prepend P
end
p C.ancestors`,
            choices: [
                "<code>[P, C, I, Object, Kernel, BasicObject]</code>",
                "<code>[C, P, I, Object, Kernel, BasicObject]</code>",
                "<code>[C, I, Object, Kernel, BasicObject, P]</code>",
                "<code>[P, I, C, Object, Kernel, BasicObject]</code>"
            ],
            correct: 0,
            explanation: "<code>prepend</code>はクラスより前に配置され、<code>include</code>はクラスとスーパークラスの間に挿入されます。"
        },
        {
            question: "<code>x + 1</code> の結果が <code>(4/3)</code> になるために、xに入る正しい記述はどれですか？",
            code: `x = __(1)__
p x + 1   # => (4/3)`,
            choices: [
                "<code>1 / 3r</code>",
                "<code>1 / 3R</code>",
                "<code>1 / %r(3)</code>",
                "<code>1 / 3</code>"
            ],
            correct: 0,
            explanation: "数値末尾の<code>r</code>は<code>Rational</code>オブジェクトを生成します。<code>1/3r</code>は<code>Rational(1, 3)</code>と等価です。"
        },
        {
            question: "次のコードでLazy Enumerableを使い最初の3件を配列で取得する方法をすべて選んでください。",
            code: `p ("aaaaaa".."zzzzzz").lazy.select { |e|
  e.end_with?("f")
}.__(1)__
# => ["aaaaaf", "aaaabf", "aaaacf"]`,
            choices: [
                "<code>first(3)</code>",
                "<code>take(3)</code>",
                "<code>take(3).force</code>",
                "<code>first(3).force</code>"
            ],
            correct: [0, 2],
            explanation: "<code>first(3)</code>は列挙を強制してArrayを返します。<code>take(3).force</code>も同様にArrayを返します。<code>take(3)</code>だけではLazyオブジェクトのままです。<code>first(3)</code>は既にArrayなので<code>.force</code>は不要（NoMethodError）です。"
        },
        {
            question: "次のコードで引数をそのまま転送するために__(1)__に入る記号はどれですか？",
            code: `def round(n, __(1)__)
  n.round(__(1)__)
end
p round(2.5, half: :even)  # => 2`,
            choices: [
                "<code>*</code>",
                "<code>&</code>",
                "<code>..</code>",
                "<code>...</code>"
            ],
            correct: 3,
            explanation: "<code>...</code>は引数の転送（forwarding）を行います。キーワード引数やブロックを含むすべての引数を転送できます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `class A
  def foo
    self.bar
  end
  private
  def bar
    "baz"
  end
  def self.bar
    "quux"
  end
end
puts A.new.foo`,
            choices: [
                "<code>baz</code>",
                "<code>quux</code>",
                "文法エラーが発生する",
                "例外が発生する"
            ],
            correct: 0,
            explanation: "Ruby 2.7以降では、<code>self</code>に対するprivateメソッド呼び出しが許可されています。そのため<code>self.bar</code>でインスタンスのprivateメソッド<code>bar</code>が呼ばれ、\"baz\"が返されます。"
        },
        {
            question: "<code>class << self</code>で定義したメソッドを呼び出す正しい方法をすべて選んでください。",
            code: `class Greeter
  class << self
    def hello
      puts "Hello there!"
    end
  end
end`,
            choices: [
                "<code>Greeter.new.hello</code>",
                "<code>Greeter.hello</code>",
                "<code>Greeter.new.class.hello</code>",
                "<code>Greeter.class.new.hello</code>"
            ],
            correct: [1, 2],
            explanation: "<code>class << self</code>で定義したメソッドはクラスメソッドになります。<code>Greeter.hello</code>で直接呼び出せます。<code>Greeter.new.class</code>は<code>Greeter</code>を返すので、それ経由でも呼べます。"
        },
        {
            question: "ブロックを使って<code>n * block</code>の結果を返すメソッド定義として正しいものをすべて選んでください。",
            code: `__(1)__
p multiply_by(4) { 2 + 3 }  # => 20`,
            choices: [
                '<pre class="choice-code">def multiply_by(n, &block)\n  n * block.call\nend</pre>',
                '<pre class="choice-code">def multiply_by(n, &block)\n  n * block\nend</pre>',
                '<pre class="choice-code">def multiply_by(n)\n  n * yield\nend</pre>',
                '<pre class="choice-code">def multiply_by(n)\n  n * yield.call\nend</pre>'
            ],
            correct: [0, 2],
            explanation: "<code>&block</code>でブロックをProcオブジェクトとして受け取り<code>block.call</code>で実行する方法と、<code>yield</code>で暗黙的にブロックを呼び出す方法の両方が使えます。<code>n * block</code>はProcオブジェクトとの乗算でエラー、<code>yield.call</code>はyieldの戻り値(Integer)にcallを呼ぶためエラーになります。"
        },
        {
            question: "ブロックの呼び出しとして正しいものをすべて選んでください。",
            code: `__(1)__
p sum { |e| e << 1 << 5 << 7 }  # => 13`,
            choices: [
                '<pre class="choice-code">def sum(&block)\n  array = []\n  block(array)\n  array.reduce(:+)\nend</pre>',
                '<pre class="choice-code">def sum(&block)\n  array = []\n  block.call(array)\n  array.reduce(:+)\nend</pre>',
                '<pre class="choice-code">def sum\n  array = []\n  yield(array)\n  array.reduce(:+)\nend</pre>',
                '<pre class="choice-code">def sum\n  array = []\n  yield.call(array)\n  array.reduce(:+)\nend</pre>'
            ],
            correct: [1, 2],
            explanation: "<code>block.call(array)</code>でProcオブジェクトを引数付きで実行する方法と、<code>yield(array)</code>で暗黙的にブロックを呼び出す方法が正しいです。<code>block(array)</code>はメソッド呼び出しとして解釈されエラー、<code>yield.call</code>はyieldの戻り値にcallを呼ぶためエラーになります。"
        },
        {
            question: "クラス変数の共有について、次のコードの実行結果として正しいものはどれですか？",
            code: `class A
  @@x = 1
end
class B < A
  def self.x
    @@x
  end
end
class C < A
  def self.inc
    @@x += 1
  end
end
C.inc
p B.x`,
            choices: [
                "<code>1</code>",
                "<code>2</code>",
                "<code>3</code>",
                "例外が発生する"
            ],
            correct: 1,
            explanation: "クラス変数は継承階層全体で共有されます。Cクラスで<code>@@x</code>をインクリメントすると、Bクラスからも変更が見えます。"
        }
    ],

    // セット2: Proc・Lambda・遅延評価（Q11-Q20）
    set2: [
        {
            question: "Procオブジェクトを実行するためのメソッドはどれですか？",
            code: `words = ["apple", "banana", "cabbage"]
pop = Proc.new { words.pop }
3.times { puts __(1)__ }`,
            choices: [
                "<code>pop.load</code>",
                "<code>pop.send</code>",
                "<code>pop.run</code>",
                "<code>pop.call</code>",
                "<code>pop.eval</code>"
            ],
            correct: 3,
            explanation: "<code>Proc#call</code>でProcオブジェクトを実行します。<code>pop.()</code>や<code>pop[]</code>でも同様に呼び出せます。"
        },
        {
            question: "Procオブジェクトを生成する正しい方法をすべて選んでください。",
            code: `words = ["apple", "banana", "cabbage"]
pop = __(1)__ { words.pop }
3.times { puts pop.call }`,
            choices: [
                "<code>Proc.new</code>",
                "<code>Block.new</code>",
                "<code>lambda</code>",
                "<code>Lambda.new</code>"
            ],
            correct: [0, 2],
            explanation: "<code>Proc.new</code>と<code>lambda</code>の両方でProcオブジェクトを生成できます。<code>Block.new</code>や<code>Lambda.new</code>というクラスは存在しません。"
        },
        {
            question: "ラムダ式の正しい構文はどれですか？",
            code: `add = __(1)__
puts add.call("hello")  # => HELLO`,
            choices: [
                "<code>->(e) { e.upcase }</code>",
                "<code>\\(e) -> { e.upcase }</code>",
                "<code>-> { (e) e.upcase }</code>",
                "<code>-> { |e| e.upcase }</code>"
            ],
            correct: 0,
            explanation: "<code>->(引数) { 処理 }</code>がラムダリテラルの正しい構文です。<code>lambda { |引数| 処理 }</code>と等価です。"
        },
        {
            question: "トップレベルで<code>p add(1, 2)</code>を呼び出し<code>3</code>を出力するための正しい方法はどれですか？",
            code: `__(1)__
  x + y
end
p add(1, 2)  # => 3`,
            choices: [
                "<code>add = ->(x, y) do</code>",
                "<code>add = lambda do |x, y|</code>",
                "<code>add = Proc.new do |x, y|</code>",
                "<code>define_method(:add) do |x, y|</code>"
            ],
            correct: 3,
            explanation: "<code>define_method</code>はメソッドを定義します。(A)～(C)はProcを変数に代入するだけで、<code>add(1, 2)</code>のようなメソッド呼び出しはできません（<code>add.call(1, 2)</code>なら可能）。"
        },
        {
            question: "squiggly heredoc（<code>&lt;&lt;~EOF</code>）を使ったコードの出力として正しいものはどれですか？",
            code: `def reader_method(s)
  <<~EOF
    def #{s}
      @#{s}
    end
  EOF
end
print reader_method("foo")`,
            choices: [
                '<pre class="choice-code">    def foo\n      @foo\n    end</pre>',
                '<pre class="choice-code">  def foo\n    @foo\n  end</pre>',
                '<pre class="choice-code">def foo\n  @foo\nend</pre>',
                "文法エラーが発生する"
            ],
            correct: 2,
            explanation: "<code>&lt;&lt;~EOF</code>（squiggly heredoc）は共通の先頭空白を自動的に除去します。最も少ないインデント分が取り除かれます。"
        },
        {
            question: "特異メソッドを持つオブジェクトをコピーする方法として正しいものはどれですか？",
            code: `obj = Object.new
def obj.hello
  puts "Hi!"
end
copy = __(1)__
copy.hello  # => Hi!`,
            choices: [
                "<code>Marshal.load(Marshal.dump(obj))</code>",
                "<code>obj.dup</code>",
                "<code>obj.clone</code>",
                "<code>obj.copy</code>"
            ],
            correct: 2,
            explanation: "<code>clone</code>は特異メソッドもコピーします。<code>dup</code>は特異メソッドをコピーしません。<code>Marshal.dump</code>は特異メソッドを持つオブジェクトをシリアライズできません。<code>copy</code>メソッドは存在しません。"
        },
        {
            question: "<code>puts</code>でオブジェクトを表示する際に呼ばれるメソッドはどれですか？",
            code: `class ShoppingList
  def initialize
    @items = []
  end
  def add_item(item)
    @items << item
  end
  def __(1)__
    @items.map { |e| "- #{e}" }.join("\\n")
  end
end
list = ShoppingList.new
list.add_item("Milk")
list.add_item("Bread")
list.add_item("Eggs")
puts list`,
            choices: [
                "<code>to_s</code>",
                "<code>to_str</code>",
                "<code>inspect</code>",
                "<code>puts</code>"
            ],
            correct: 0,
            explanation: "<code>puts</code>はオブジェクトの<code>to_s</code>メソッドを呼び出して文字列に変換します。"
        },
        {
            question: "<code>p</code>メソッドでオブジェクトを表示する際に呼ばれるメソッドはどれですか？",
            code: `class ShoppingList
  def __(1)__
    "ShoppingList:\\n  @items: #{@items.inspect}"
  end
end
list = ShoppingList.new
list.add_item("Milk")
p list`,
            choices: [
                "<code>to_s</code>",
                "<code>to_str</code>",
                "<code>inspect</code>",
                "<code>p</code>"
            ],
            correct: 2,
            explanation: "<code>p</code>メソッドはオブジェクトの<code>inspect</code>メソッドを呼び出して表示します。"
        },
        {
            question: "無限範囲と遅延評価でピタゴラス数を求めるコードの__(1)__に入る正しい記述はどれですか？",
            code: `p __(1)__.flat_map { |z|
  (1..z).flat_map { |x|
    (x..z).select { |y|
      x**2 + y**2 == z**2
    }.map { |y| [x, y, z] }
  }
}.take(3).to_a`,
            choices: [
                "<code>(1..-1).delay</code>",
                "<code>(1..).delay</code>",
                "<code>(1..-1).lazy</code>",
                "<code>(1..).lazy</code>"
            ],
            correct: 3,
            explanation: "<code>(1..)</code>は終端のない範囲（無限範囲）です。<code>lazy</code>で遅延評価を行い、無限に評価せず必要な分だけ処理します。<code>delay</code>メソッドは存在しません。<code>(1..-1)</code>は空の範囲です。"
        },
        {
            question: "<code>nil</code>を除外しつつ各要素に<code>upcase</code>を適用するメソッドはどれですか？",
            code: `ary = ["foo", "bar", nil, "baz"]
p ary.__(1)__ { |i| i&.upcase }
# => ["FOO", "BAR", "BAZ"]`,
            choices: [
                "<code>map</code>",
                "<code>filter_map</code>",
                "<code>collect</code>",
                "<code>collect_compact</code>"
            ],
            correct: 1,
            explanation: "<code>filter_map</code>はブロックの戻り値が真の要素だけを配列で返します。<code>nil</code>やfalseは除外されます。<code>map</code>/<code>collect</code>はnilも含めて返します。<code>collect_compact</code>は存在しません。"
        }
    ],

    // セット3: 引数・パターンマッチ・例外基礎（Q21-Q30）
    set3: [
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `a, b, *c = ["apple", "banana", "carrot", "daikon"]
p c`,
            choices: [
                '<code>["apple", "banana", "carrot", "daikon"]</code>',
                '<code>"carrot"</code>',
                '<code>["carrot"]</code>',
                '<code>["carrot", "daikon"]</code>'
            ],
            correct: 3,
            explanation: "Splat演算子<code>*</code>は残りの右辺値すべてを配列として受け取ります。a=\"apple\", b=\"banana\", c=[\"carrot\", \"daikon\"]となります。"
        },
        {
            question: "次のコードの実行結果が<code>[[\"apple\", \"banana\", \"carrot\"]]</code>になるものはどれですか？",
            code: null,
            choices: [
                '<pre class="choice-code">def fx(*args)\n  p(args)\nend\nfx(*["apple", "banana", "carrot"])</pre>',
                '<pre class="choice-code">def fx(*args)\n  p(args)\nend\nfx(["apple", "banana", "carrot"])</pre>',
                '<pre class="choice-code">def fx(*args)\n  p(args)\nend\nfx("apple", "banana", "carrot")</pre>',
                '<pre class="choice-code">def fx(*args)\n  p(*args)\nend\nfx(["apple", "banana", "carrot"])</pre>'
            ],
            correct: 1,
            explanation: "<code>fx([\"apple\", \"banana\", \"carrot\"])</code>は配列を1つの引数として渡します。<code>*args</code>は全引数を配列にまとめるため、<code>[[\"apple\", \"banana\", \"carrot\"]]</code>になります。(A)(C)は個別引数になり<code>[\"apple\", ...]</code>、(D)は<code>p(*args)</code>で展開されます。"
        },
        {
            question: "ナンバードパラメータの正しい記法はどれですか？",
            code: `p ["foo", "bar", "baz"].map { __(1)__.upcase }
# => ["FOO", "BAR", "BAZ"]`,
            choices: [
                "<code>_1</code>",
                "<code>$1</code>",
                "<code>$_</code>",
                "<code>@1</code>"
            ],
            correct: 0,
            explanation: "<code>_1</code>, <code>_2</code>等はナンバードパラメータで、ブロック引数を暗黙的に参照できます。Ruby 2.7で導入されました。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `def fx(a:, b: "apple")
  p a
  p b
end
fx(b: "banana")`,
            choices: [
                "<code>nil</code> と <code>\"apple\"</code>",
                "<code>nil</code> と <code>\"banana\"</code>",
                "文法エラーが発生する",
                "例外が発生する（<code>ArgumentError</code>）"
            ],
            correct: 3,
            explanation: "<code>a:</code>はデフォルト値がないため必須キーワード引数です。<code>a:</code>を指定せずに呼び出すと<code>ArgumentError</code>が発生します。"
        },
        {
            question: "次のメソッドの呼び出しで結果が<code>7</code>になるものをすべて選んでください。",
            code: `def add(x:, y:, **params)
  z = x + y
  params[:round] ? z.round : z
end`,
            choices: [
                "<code>p add(x: 2.75, y: 5.25, round: true)</code>",
                "<code>p add(x: 3.75, y: 3, round: true)</code>",
                "<code>options = {:round => true}; p add(x: 3.75, y: 3, **options)</code>",
                "<code>p add(x: 3, y: 4)</code>",
                "<code>p add(x: 7)</code>"
            ],
            correct: [1, 2, 3],
            explanation: "(A) 2.75+5.25=8.0 → round → 8（不正解）。(B) 3.75+3=6.75 → round → 7。(C) Bと同じで<code>**</code>でHash展開。(D) 3+4=7（roundなし）。(E) <code>y:</code>未指定で<code>ArgumentError</code>。"
        },
        {
            question: "次のコードで<code>\"Hello!\"</code>を出力する方法をすべて選んでください。",
            code: `class Speaker
  @message = "Hello!"
  class << self
    @message = "Howdy!"
    def speak
      @message
    end
  end
end`,
            choices: [
                "<code>puts Speaker.speak</code>",
                "<code>puts Speaker.singleton_class.speak</code>",
                "<code>puts Speaker.instance_variable_get(:@message)</code>",
                "<code>puts Speaker.singleton_class.instance_variable_get(:@message)</code>"
            ],
            correct: [0, 2],
            explanation: "<code>Speaker.speak</code>を呼ぶと、<code>self</code>はSpeakerなので<code>@message</code>は\"Hello!\"です。<code>instance_variable_get(:@message)</code>も同様にSpeakerの<code>@message</code>\"Hello!\"を返します。特異クラスの<code>@message</code>は別の変数で\"Howdy!\"です。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `class Speaker
  @message = "Hello!"
  class << self
    @message = "Howdy!"
  end
end
class << Speaker
  p @message
end`,
            choices: [
                '<code>"Hello!"</code>',
                '<code>"Howdy!"</code>',
                "<code>nil</code>",
                "文法エラーが発生する"
            ],
            correct: 1,
            explanation: "<code>class << Speaker</code>で特異クラスを再オープンすると、そこでの<code>@message</code>は特異クラスのインスタンス変数\"Howdy!\"を参照します。"
        },
        {
            question: "catch/throwで処理を脱出するために__(1)__に入る正しい記述はどれですか？",
            code: `def x; puts "x"; end
def y; puts "y"; throw :done; end
def z; puts "z"; end

__(1)__ do
  x; y; z
end
puts "done!"`,
            choices: [
                "<code>try</code>",
                "<code>catch</code>",
                "<code>catch :done</code>",
                "<code>rescue</code>"
            ],
            correct: 2,
            explanation: "<code>catch :done</code>で、対応する<code>throw :done</code>が呼ばれるとブロックを脱出します。<code>try</code>はRubyには存在しません。"
        },
        {
            question: "catch/throwで値を返すための正しいthrowの書き方はどれですか？",
            code: `letters = catch(:done) do
  ("a".."z").each do |a|
    ("a".."z").each do |b|
      ("a".."z").each do |c|
        if a < b && b < c
          __(1)__
        end
      end
    end
  end
end
puts letters.join  # => abc`,
            choices: [
                "<code>throw [a,b,c]</code>",
                "<code>throw [a,b,c], :done</code>",
                "<code>throw :done, [a,b,c]</code>",
                "<code>raise :done, [a,b,c]</code>"
            ],
            correct: 2,
            explanation: "<code>throw :done, value</code>の第2引数が<code>catch(:done)</code>の戻り値になります。"
        },
        {
            question: "rescueを引数なしで使った場合にキャッチされる例外をすべて選んでください。",
            code: `begin
  __(1)__
rescue
  puts "OK"
end`,
            choices: [
                "<code>raise StandardError</code>",
                "<code>raise Exception</code>",
                "<code>raise ArgumentError</code>",
                "<code>raise ScriptError</code>"
            ],
            correct: [0, 2],
            explanation: "引数なしの<code>rescue</code>は<code>StandardError</code>とそのサブクラスのみをキャッチします。<code>ArgumentError</code>は<code>StandardError</code>のサブクラスです。<code>Exception</code>や<code>ScriptError</code>は<code>StandardError</code>のサブクラスではないためキャッチされません。"
        }
    ],

    // セット4: 例外処理・self・継承（Q31-Q40）
    set4: [
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `AnError = Class.new(Exception)
begin
  raise AnError
rescue
  puts "Bare rescue"
rescue StandardError
  puts "StandardError rescue"
rescue AnError
  puts "AnError rescue"
rescue Exception
  puts "Exception rescue"
end`,
            choices: [
                "<code>Bare rescue</code>",
                "<code>StandardError rescue</code>",
                "<code>AnError rescue</code>",
                "<code>Exception rescue</code>",
                "<code>AnError rescue</code> と <code>Exception rescue</code> の両方"
            ],
            correct: 2,
            explanation: "<code>AnError</code>は<code>Exception</code>を直接継承しているため、引数なし<code>rescue</code>（<code>StandardError</code>）にも<code>rescue StandardError</code>にもマッチしません。3つ目の<code>rescue AnError</code>でキャッチされます。rescueは最初にマッチしたもの1つだけが実行されます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `AnError = Class.new(Exception)
begin
  raise AnError
rescue
  puts "Bare rescue"
rescue StandardError
  puts "StandardError rescue"
rescue Exception
  puts "Exception rescue"
rescue AnError
  puts "AnError rescue"
end`,
            choices: [
                "<code>Bare rescue</code>",
                "<code>StandardError rescue</code>",
                "<code>AnError rescue</code>",
                "<code>Exception rescue</code>",
                "<code>Exception rescue</code> と <code>AnError rescue</code> の両方"
            ],
            correct: 3,
            explanation: "<code>rescue Exception</code>が<code>rescue AnError</code>より先にあるため、<code>Exception</code>のサブクラスである<code>AnError</code>はここでキャッチされます。rescueは上から順に評価され、最初にマッチしたもの1つだけが実行されます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `begin
  "hello".world
rescue => ex
  p ex.class
end`,
            choices: [
                "<code>StandardError</code>",
                "<code>Exception</code>",
                "<code>NameError</code>",
                "<code>NoMethodError</code>",
                "<code>ArgumentError</code>"
            ],
            correct: 3,
            explanation: "存在しないメソッドを呼び出すと<code>NoMethodError</code>が発生します。<code>NoMethodError</code>は<code>NameError</code>のサブクラスです。"
        },
        {
            question: "rescue内で引数なしの<code>raise</code>を呼ぶと何が起きますか？",
            code: `CustomError = Class.new(StandardError)
def boom
  raise CustomError
rescue
  raise
end
begin
  boom
rescue => e
  p e.class
end`,
            choices: [
                "<code>CustomError</code>",
                "<code>StandardError</code>",
                "<code>Exception</code>",
                "<code>RuntimeError</code>",
                "<code>SyntaxError</code>"
            ],
            correct: 0,
            explanation: "<code>rescue</code>内で引数なしの<code>raise</code>を呼ぶと、キャッチした例外をそのまま再発生させます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `def greeting
  "hello"
ensure
  puts "Ensure called!"
  "hi"
end
puts greeting`,
            choices: [
                "<code>hello</code> のみ",
                "<code>hi</code> のみ",
                "<code>Ensure called!</code> と <code>hello</code>",
                "<code>Ensure called!</code> と <code>hi</code>"
            ],
            correct: 2,
            explanation: "<code>ensure</code>は必ず実行されますが、<code>ensure</code>内の値は戻り値になりません。メソッドの戻り値は<code>ensure</code>前の最後の評価値\"hello\"です。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `class Identity
  def self.this_object
    self
  end
  def this_object
    self
  end
end
a = Identity.this_object
b = Identity.this_object
c = Identity.new.this_object
d = Identity.new.this_object
p a == b
p c == d`,
            choices: [
                "<code>true</code> と <code>true</code>",
                "<code>true</code> と <code>false</code>",
                "<code>false</code> と <code>true</code>",
                "<code>false</code> と <code>false</code>"
            ],
            correct: 1,
            explanation: "クラスメソッドの<code>self</code>は常に同じクラスオブジェクトを返すので<code>a == b</code>はtrue。インスタンスメソッドの<code>self</code>は毎回異なるインスタンスなので<code>c == d</code>はfalse。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `class Identity
  def self.this_object
    self.class
  end
  def this_object
    self
  end
end
p Identity.this_object.class
p Identity.new.this_object.class`,
            choices: [
                "<code>Identity</code> と <code>Identity</code>",
                "<code>Class</code> と <code>Identity</code>",
                "<code>Object</code> と <code>Identity</code>",
                "<code>Class</code> と <code>Object</code>"
            ],
            correct: 1,
            explanation: "クラスメソッドの<code>self</code>は<code>Identity</code>クラスで、<code>self.class</code>は<code>Class</code>。その<code>.class</code>も<code>Class</code>。インスタンスの<code>self.class</code>は<code>Identity</code>。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `module Mixin
  def this_object
    self
  end
end
class Identity
  include Mixin
end
p Identity.new.this_object.class`,
            choices: [
                "<code>Mixin</code>",
                "<code>Class</code>",
                "<code>Object</code>",
                "<code>Identity</code>"
            ],
            correct: 3,
            explanation: "モジュールをincludeしても、<code>self</code>は現在のオブジェクトを参照します。<code>Identity</code>のインスタンスなので<code>Identity</code>が返ります。"
        },
        {
            question: "<code>Class</code>クラスのスーパークラスはどれですか？",
            code: null,
            choices: [
                "<code>Object</code>",
                "<code>Module</code>",
                "<code>BasicObject</code>",
                "<code>Class</code>"
            ],
            correct: 1,
            explanation: "<code>Class</code>は<code>Module</code>のサブクラスです。<code>Module</code>は<code>Object</code>のサブクラスです。"
        },
        {
            question: "モジュールの<code>self.</code>メソッドについて、次のコードの結果として正しいものはどれですか？",
            code: `module Mixin
  def self.greet
    puts "Hello World!"
  end
end
class SomeClass
  include Mixin
end`,
            choices: [
                "<code>Mixin.greet</code>は出力されるが、<code>SomeClass.greet</code>は例外",
                "<code>SomeClass.greet</code>は出力されるが、<code>Mixin.greet</code>は例外",
                "両方出力される",
                "両方例外が発生する"
            ],
            correct: 0,
            explanation: "モジュールの<code>self.greet</code>はモジュールの特異メソッドです。<code>include</code>してもクラスメソッドとしては使えません。"
        }
    ],

    // セット5: モジュール・標準ライブラリ・その他（Q41-Q50）
    set5: [
        {
            question: "<code>extend</code>でモジュールを取り込んだ場合に<code>\"Hello World!\"</code>を出力する呼び出し方はどれですか？",
            code: `module Mixin
  def greet
    puts "Hello World!"
  end
end
class SomeClass
  extend Mixin
end`,
            choices: [
                "<code>Mixin.greet</code>",
                "<code>SomeClass.new.greet</code>",
                "<code>SomeClass.greet</code>",
                "<code>Mixin.new.greet</code>"
            ],
            correct: 2,
            explanation: "<code>extend</code>はモジュールのメソッドを特異メソッド（クラスメソッド）として取り込みます。<code>SomeClass.greet</code>で呼び出せます。"
        },
        {
            question: "<code>include</code>でモジュールを取り込んだ場合に<code>\"Hello World!\"</code>を出力する呼び出し方はどれですか？",
            code: `module Mixin
  def greet
    puts "Hello World!"
  end
end
class SomeClass
  include Mixin
end`,
            choices: [
                "<code>Mixin.greet</code>",
                "<code>SomeClass.new.greet</code>",
                "<code>SomeClass.greet</code>",
                "<code>Mixin.new.greet</code>"
            ],
            correct: 1,
            explanation: "<code>include</code>はモジュールのメソッドをインスタンスメソッドとして取り込みます。<code>SomeClass.new.greet</code>で呼び出せます。"
        },
        {
            question: "privateメソッドを外部から呼び出せるようにする方法として不適切なものはどれですか？",
            code: `class BaseClass
  private
  def greet
    puts "Hello World!"
  end
end
class ChildClass < BaseClass
  __(1)__
end
ChildClass.new.greet`,
            choices: [
                "<code>public :greet</code>",
                "<code>protected :greet</code>",
                '<pre class="choice-code">def greet\n  super\nend</pre>',
                '<pre class="choice-code">alias_method :original_greet, :greet\ndef greet\n  original_greet\nend</pre>'
            ],
            correct: 1,
            explanation: "<code>protected</code>にすると同じクラスかサブクラスのインスタンスからしか呼び出せず、外部から<code>ChildClass.new.greet</code>で呼び出すと<code>NoMethodError</code>になります。"
        },
        {
            question: "パターンマッチングで使用するキーワードはどれですか？",
            code: `h = [1, 2, 3]
case h
__(1)__ [x, y]
  p [:two, x, y]
__(1)__ [x, y, z]
  p [:three, x, y, z]
end
# => [:three, 1, 2, 3]`,
            choices: [
                "<code>when</code>",
                "<code>in</code>",
                "<code>if</code>",
                "<code>=></code>"
            ],
            correct: 1,
            explanation: "パターンマッチングでは<code>case</code>と<code>in</code>を使います。<code>when</code>は従来のcase文で使用します。"
        },
        {
            question: "<code>Enumerable</code>を使うために実装が必要なメソッドはどれですか？",
            code: `class Alphabet
  include Enumerable
  def initialize
    @letters = ("A".."Z").to_a
  end
  def __(1)__
    @letters.each { |e| yield e }
  end
end`,
            choices: [
                "<code>all</code>",
                "<code>each</code>",
                "<code>to_a</code>",
                "<code>to_ary</code>",
                "<code>to_enum</code>"
            ],
            correct: 1,
            explanation: "<code>Enumerable</code>モジュールは<code>each</code>メソッドの実装を前提としています。<code>each</code>を元に他のメソッドが自動的に提供されます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `class TShirt
  SIZES = [:xs, :s, :m, :l, :xl, :xxl]
  include Comparable
  def initialize(size)
    @size = size
  end
  attr_reader :size
  def <=>(other)
    SIZES.index(size) <=> SIZES.index(other.size)
  end
end
medium = TShirt.new(:m)
large = TShirt.new(:l)
p medium == large
p medium < large
p medium <= large
p medium > large
p medium >= large`,
            choices: [
                "<code>true, false, true, false, true</code>",
                "<code>false, true, true, false, false</code>",
                "<code>false, false, false, true, true</code>",
                "<code>false, false, false, false, false</code>",
                "例外が発生する"
            ],
            correct: 1,
            explanation: "<code>Comparable</code>は<code><=></code>だけで比較メソッドを提供します。:mのindex=2, :lのindex=3なので、medium < large はtrue、medium <= large もtrueです。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `require "date"
date = Date.new(2000, 2, 24)
puts(date << 12)
puts(date >> 12)`,
            choices: [
                "<code>2000-02-12</code> と <code>2000-03-07</code>",
                "<code>2000-03-07</code> と <code>2000-02-12</code>",
                "<code>1999-02-24</code> と <code>2001-02-24</code>",
                "<code>1988-02-24</code> と <code>2012-02-24</code>"
            ],
            correct: 2,
            explanation: "<code><<</code>は指定した月数だけ前の日付を、<code>>></code>は指定した月数だけ後の日付を返します。12ヶ月 = 1年なので、1999-02-24と2001-02-24です。"
        },
        {
            question: "文字列からテンプレートに従って時刻を解析するメソッドはどれですか？",
            code: `require "time"
t = Time.__(1)__("00000024021993", "%S%M%H%d%m%Y")
puts t.iso8601`,
            choices: [
                "<code>format</code>",
                "<code>parse</code>",
                "<code>strftime</code>",
                "<code>strptime</code>"
            ],
            correct: 3,
            explanation: "<code>strptime</code>はテンプレートを使用して文字列から時刻を解析します。<code>strftime</code>は逆に時刻を文字列にフォーマットします。<code>parse</code>はヒューリスティックに解析します。"
        },
        {
            question: "Singletonパターンを実装するための正しい記述はどれですか？",
            code: `require "singleton"
class Foo
  __(1)__
end
x = Foo.instance
y = Foo.instance
p x.equal?(y)  # => true`,
            choices: [
                "<code>include Singleton</code>",
                "<code>extend Singleton</code>",
                "<code>using Singleton</code>",
                "<code>singletonize</code>"
            ],
            correct: 0,
            explanation: "<code>include Singleton</code>でSingletonパターンを実装します。<code>new</code>がprivateになり、<code>instance</code>メソッドで唯一のインスタンスを取得します。"
        },
        {
            question: "<code>Forwardable</code>でメソッドを委譲するためのメソッドはどれですか？",
            code: `require 'forwardable'
class List
  extend Forwardable
  def initialize
    @contents = []
  end
  __(1)__ :@contents, :push
  __(1)__ :@contents, :[]
end
list = List.new
list.push("a")
list.push("b")
list.push("c")
p list[1]  # => "b"`,
            choices: [
                "<code>forward</code>",
                "<code>def_forwarder</code>",
                "<code>def_delegator</code>",
                "<code>define</code>"
            ],
            correct: 2,
            explanation: "<code>def_delegator</code>はメソッド呼び出しを指定したオブジェクトに委譲します。<code>Forwardable</code>モジュールの主要メソッドです。"
        }
    ]
};

const setInfo = {
    set1: { name: "セット1", description: "メソッド定義・モジュール基礎", count: 10 },
    set2: { name: "セット2", description: "Proc・Lambda・遅延評価", count: 10 },
    set3: { name: "セット3", description: "引数・パターンマッチ", count: 10 },
    set4: { name: "セット4", description: "例外処理・self・継承", count: 10 },
    set5: { name: "セット5", description: "モジュール・標準ライブラリ", count: 10 }
};
