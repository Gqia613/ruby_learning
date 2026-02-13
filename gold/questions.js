const questions = {
    // セット1: メソッド定義・モジュール・クラス基礎（10問）
    set1: [
        {
            question: "Stackクラスでpushとpopメソッドを動的に定義する方法として正しくないものはどれですか？",
            code: `class Stack
  def initialize
    @contents = []
  end
  __(1)__
end`,
            choices: [
                "[:push, :pop].each { |name| define_method(name) { |*args| @contents.send(name, *args) } }",
                "for name in [:push, :pop]; define_method(name) { |*args| @contents.send(name, *args) } end",
                '[:push, :pop].each { |name| class_eval("def #{name}(*args); @contents.#{name}(*args); end") }',
                "上記すべて正しい"
            ],
            correct: 1,
            explanation: "<code>for</code>はブロックスコープを作らないため、変数<code>name</code>がループ全体で共有され、両メソッドが最後の値<code>:pop</code>の処理になります。<code>each</code>はブロックごとにスコープを作るため正しく動作します。<code>class_eval</code>内の<code>def</code>はインスタンスメソッドを定義するため正しく動作します。"
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
                "[P, C, I, Object, Kernel, BasicObject]",
                "[C, P, I, Object, Kernel, BasicObject]",
                "[C, I, Object, Kernel, BasicObject, P]",
                "[P, I, C, Object, Kernel, BasicObject]"
            ],
            correct: 0,
            explanation: "<code>prepend</code>はクラスより前に配置され、<code>include</code>はクラスとスーパークラスの間に挿入されます。"
        },
        {
            question: "x + 1 の結果が (4/3) になるために、xに入る正しい記述はどれですか？",
            code: `x = __(1)__
p x + 1   # => (4/3)`,
            choices: ["1 / 3r", "1 / 3R", "1 / %r(3)", "1 / 3"],
            correct: 0,
            explanation: "数値末尾の<code>r</code>は<code>Rational</code>オブジェクトを生成します。<code>1/3r</code>は<code>Rational(1, 3)</code>と等価です。"
        },
        {
            question: "次のコードでLazy Enumerableを使い最初の3件を取得する方法として正しいものはどれですか？",
            code: `p ("aaaaaa".."zzzzzz").lazy.select { |e|
  e.end_with?("f")
}.__(1)__
# => ["aaaaaf", "aaaabf", "aaaacf"]`,
            choices: [
                "first(3)",
                "take(3)",
                "take(3).force",
                "first(3) と take(3).force の両方"
            ],
            correct: 3,
            explanation: "<code>first(3)</code>は列挙を強制してArrayを返します。<code>take(3).force</code>も同様にArrayを返します。<code>take(3)</code>だけではLazyオブジェクトのままです。"
        },
        {
            question: "次のコードで引数をそのまま転送するために__(1)__に入る記号はどれですか？",
            code: `def round(n, __(1)__)
  n.round(__(1)__)
end
p round(2.5, half: :even)  # => 2`,
            choices: ["*", "&", "..", "..."],
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
end
puts A.new.foo`,
            choices: ["baz", "quux", "文法エラーが発生する", "例外が発生する"],
            correct: 0,
            explanation: "Ruby 2.7以降では、<code>self</code>に対するprivateメソッド呼び出しが許可されています。そのため<code>self.bar</code>で\"baz\"が返されます。"
        },
        {
            question: "class << self で定義したメソッドを呼び出す正しい方法はどれですか？",
            code: `class Greeter
  class << self
    def hello
      puts "Hello there!"
    end
  end
end`,
            choices: [
                "Greeter.new.hello",
                "Greeter.hello",
                "Greeter.new.class.hello",
                "Greeter.hello と Greeter.new.class.hello の両方"
            ],
            correct: 3,
            explanation: "<code>class << self</code>で定義したメソッドはクラスメソッドになります。<code>Greeter.hello</code>で直接呼び出せます。<code>Greeter.new.class</code>は<code>Greeter</code>を返すので、それ経由でも呼べます。"
        },
        {
            question: "ブロック引数を使ってn * blockの結果を返すメソッド定義として正しいものはどれですか？",
            code: `__(1)__
p multiply_by(4) { 2 + 3 }  # => 20`,
            choices: [
                "def multiply_by(n, &block); n * block.call; end",
                "def multiply_by(n, &block); n * block; end",
                "def multiply_by(n); n * yield; end",
                "def multiply_by(n, &block); n * block.call; end と def multiply_by(n); n * yield; end の両方"
            ],
            correct: 3,
            explanation: "<code>&block</code>でブロックをProcオブジェクトとして受け取り<code>block.call</code>で実行する方法と、<code>yield</code>で暗黙的にブロックを呼び出す方法の両方が使えます。"
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
            choices: ["1", "2", "3", "例外が発生する"],
            correct: 1,
            explanation: "クラス変数は継承階層全体で共有されます。Cクラスで<code>@@x</code>をインクリメントすると、Bクラスからも変更が見えます。"
        },
        {
            question: "Procオブジェクトを実行するためのメソッドはどれですか？",
            code: `words = ["apple", "banana", "cabbage"]
pop = Proc.new { words.pop }
3.times { puts pop.__(1)__ }`,
            choices: ["load", "send", "run", "call"],
            correct: 3,
            explanation: "<code>Proc#call</code>でProcオブジェクトを実行します。<code>pop.()</code>や<code>pop[]</code>でも同様に呼び出せます。"
        }
    ],

    // セット2: Proc・Lambda・遅延評価（10問）
    set2: [
        {
            question: "Procオブジェクトを生成する正しい方法の組み合わせはどれですか？",
            code: `words = ["apple", "banana", "cabbage"]
pop = __(1)__ { words.pop }
3.times { puts pop.call }`,
            choices: [
                "Proc.new と lambda",
                "Block.new と Lambda.new",
                "Proc.new のみ",
                "lambda のみ"
            ],
            correct: 0,
            explanation: "<code>Proc.new</code>と<code>lambda</code>の両方でProcオブジェクトを生成できます。<code>Block.new</code>や<code>Lambda.new</code>は存在しません。"
        },
        {
            question: "ラムダ式の正しい構文はどれですか？",
            code: `add = __(1)__
puts add.call("hello")  # => HELLO`,
            choices: [
                "->(e) { e.upcase }",
                "\\(e) -> { e.upcase }",
                "-> { (e) e.upcase }",
                "-> { |e| e.upcase }"
            ],
            correct: 0,
            explanation: "<code>->(引数) { 処理 }</code>がラムダリテラルの正しい構文です。<code>lambda { |引数| 処理 }</code>と等価です。"
        },
        {
            question: "トップレベルでメソッドを定義してp add(1, 2)で呼び出すための正しい方法はどれですか？",
            code: `__(1)__
  x + y
end
p add(1, 2)  # => 3`,
            choices: [
                "add = ->(x, y) do",
                "add = lambda do |x, y|",
                "add = Proc.new do |x, y|",
                "define_method(:add) do |x, y|"
            ],
            correct: 3,
            explanation: "<code>define_method</code>はメソッドを定義します。(A)～(C)はProcを生成するだけで、<code>add(1, 2)</code>のようなメソッド呼び出しはできません。"
        },
        {
            question: "squiggly heredoc（<<~EOF）の特徴として正しいものはどれですか？",
            code: `def reader_method(s)
  <<~EOF
    def #{s}
      @#{s}
    end
  EOF
end
print reader_method("foo")`,
            choices: [
                "4スペースのインデント付きで出力される",
                "2スペースのインデント付きで出力される",
                "先頭の空白が除去されインデントなしで出力される",
                "文法エラーが発生する"
            ],
            correct: 2,
            explanation: "<code><<~EOF</code>（squiggly heredoc）は共通の先頭空白を自動的に除去します。"
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
                "Marshal.load(Marshal.dump(obj))",
                "obj.dup",
                "obj.clone",
                "obj.copy"
            ],
            correct: 2,
            explanation: "<code>clone</code>は特異メソッドもコピーします。<code>dup</code>は特異メソッドをコピーしません。<code>Marshal.dump</code>は特異メソッドを持つオブジェクトをシリアライズできません。"
        },
        {
            question: "putsでオブジェクトを表示する際に呼ばれるメソッドはどれですか？",
            code: `class ShoppingList
  def initialize
    @items = []
  end
  def add_item(item)
    @items << item
  end
  def __(1)__
    @items.map { |e| "- \#{e}" }.join("\\n")
  end
end
list = ShoppingList.new
list.add_item("Milk")
puts list`,
            choices: ["to_s", "to_str", "inspect", "puts"],
            correct: 0,
            explanation: "<code>puts</code>はオブジェクトの<code>to_s</code>メソッドを呼び出して文字列に変換します。"
        },
        {
            question: "pメソッドでオブジェクトを表示する際に呼ばれるメソッドはどれですか？",
            code: null,
            choices: ["to_s", "to_str", "inspect", "display"],
            correct: 2,
            explanation: "<code>p</code>メソッドはオブジェクトの<code>inspect</code>メソッドを呼び出して表示します。"
        },
        {
            question: "無限範囲と遅延評価を使ってピタゴラス数を求めるコードで、__(1)__に入る正しい記述はどれですか？",
            code: `p __(1)__.flat_map { |z|
  (1..z).flat_map { |x|
    (x..z).select { |y|
      x**2 + y**2 == z**2
    }.map { |y| [x, y, z] }
  }
}.take(3).to_a`,
            choices: [
                "(1..-1).delay",
                "(1..).delay",
                "(1..-1).lazy",
                "(1..).lazy"
            ],
            correct: 3,
            explanation: "<code>(1..)</code>は終端のない範囲（無限範囲）です。<code>lazy</code>で遅延評価を行い、無限に評価せず必要な分だけ処理します。"
        },
        {
            question: "nilを除外しつつ各要素にupcaseを適用するメソッドはどれですか？",
            code: `ary = ["foo", "bar", nil, "baz"]
p ary.__(1)__ { |i| i&.upcase }
# => ["FOO", "BAR", "BAZ"]`,
            choices: ["map", "filter_map", "collect", "collect_compact"],
            correct: 1,
            explanation: "<code>filter_map</code>はブロックの戻り値が真の要素だけを配列で返します。nilやfalseは除外されます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `a, b, *c = ["apple", "banana", "carrot", "daikon"]
p c`,
            choices: [
                '["apple", "banana", "carrot", "daikon"]',
                '"carrot"',
                '["carrot"]',
                '["carrot", "daikon"]'
            ],
            correct: 3,
            explanation: "Splat演算子<code>*</code>は残りの右辺値すべてを配列として受け取ります。a=\"apple\", b=\"banana\", c=[\"carrot\", \"daikon\"]となります。"
        }
    ],

    // セット3: 引数・パラメータ・パターンマッチ（10問）
    set3: [
        {
            question: "次のコードで p args の結果が [[\"apple\", \"banana\", \"carrot\"]] になる呼び出し方はどれですか？",
            code: `def fx(*args)
  p args
end`,
            choices: [
                'fx(*["apple", "banana", "carrot"])',
                'fx(["apple", "banana", "carrot"])',
                'fx("apple", "banana", "carrot")',
                'fx(*["apple"], *["banana"], *["carrot"])'
            ],
            correct: 1,
            explanation: "<code>fx([\"apple\", \"banana\", \"carrot\"])</code>は配列を1つの引数として渡します。<code>*args</code>は引数をまとめて配列にするため、<code>[[\"apple\", \"banana\", \"carrot\"]]</code>になります。一方、<code>fx(*[...])</code>や<code>fx(\"a\", \"b\", \"c\")</code>は展開されるため<code>[\"apple\", \"banana\", \"carrot\"]</code>になります。"
        },
        {
            question: "ナンバードパラメータの正しい記法はどれですか？",
            code: `p ["foo", "bar", "baz"].map { __(1)__.upcase }
# => ["FOO", "BAR", "BAZ"]`,
            choices: ["_1", "$1", "$_", "@1"],
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
                'nil と "apple"',
                'nil と "banana"',
                "文法エラーが発生する",
                "ArgumentErrorが発生する"
            ],
            correct: 3,
            explanation: "<code>a:</code>はデフォルト値がないため必須キーワード引数です。<code>a:</code>を指定せずに呼び出すと<code>ArgumentError</code>が発生します。"
        },
        {
            question: "ダブルスプラット引数(**)を使ったメソッドで、結果が7になる呼び出し方として正しくないものはどれですか？",
            code: `def add(x:, y:, **params)
  z = x + y
  params[:round] ? z.round : z
end`,
            choices: [
                "add(x: 2.75, y: 5.25, round: true)",
                "add(x: 3.75, y: 3, round: true)",
                "add(x: 3, y: 4)",
                "add(x: 7)"
            ],
            correct: 3,
            explanation: "<code>y:</code>は必須キーワード引数なので、<code>add(x: 7)</code>では<code>ArgumentError</code>が発生します。"
        },
        {
            question: "次のコードでSpeaker.instance_variable_get(:@message)の結果として正しいものはどれですか？",
            code: `class Speaker
  @message = "Hello!"
  class << self
    @message = "Howdy!"
    def speak
      @message
    end
  end
end`,
            choices: ['"Hello!"', '"Howdy!"', "nil", "エラーが発生する"],
            correct: 0,
            explanation: "クラスのインスタンス変数<code>@message</code>は\"Hello!\"です。特異クラス内で定義した<code>@message</code>は特異クラスのインスタンス変数であり、別の変数です。"
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
            choices: ['"Hello!"', '"Howdy!"', "nil", "文法エラーが発生する"],
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
            choices: ["try", "catch", "catch :done", "rescue"],
            correct: 2,
            explanation: "<code>catch :done</code>で、対応する<code>throw :done</code>が呼ばれるとブロックを脱出します。"
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
                "throw [a,b,c]",
                "throw [a,b,c], :done",
                "throw :done, [a,b,c]",
                "raise :done, [a,b,c]"
            ],
            correct: 2,
            explanation: "<code>throw :done, value</code>の第2引数が<code>catch(:done)</code>の戻り値になります。"
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
            choices: ["when", "in", "if", "=>"],
            correct: 1,
            explanation: "パターンマッチングでは<code>case</code>と<code>in</code>を使います。<code>when</code>は従来のcase文で使用します。"
        },
        {
            question: "Hashのダブルスプラット展開として正しいものはどれですか？",
            code: `def foo(x:, y:, z:)
  p [x, y, z]
end
h = {x: 1, y: 2, z: 3}
__(1)__
# => [1, 2, 3]`,
            choices: ["foo(*h)", "foo(**h)", "foo(&h)", "foo(^h)"],
            correct: 1,
            explanation: "<code>**</code>でハッシュをキーワード引数として展開します。<code>*</code>は配列の展開に使用します。"
        }
    ],

    // セット4: 例外処理・self・継承（10問）
    set4: [
        {
            question: "rescueを引数なしで使った場合にキャッチされる例外はどれですか？",
            code: `begin
  __(1)__
rescue
  puts "OK"
end`,
            choices: [
                "StandardErrorとそのサブクラスのみ",
                "Exceptionとそのすべてのサブクラス",
                "RuntimeErrorのみ",
                "すべてのエラー"
            ],
            correct: 0,
            explanation: "引数なしの<code>rescue</code>は<code>StandardError</code>とそのサブクラスのみをキャッチします。<code>Exception</code>を直接継承したクラスはキャッチされません。"
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
rescue AnError
  puts "AnError rescue"
rescue Exception
  puts "Exception rescue"
end`,
            choices: [
                "Bare rescue",
                "StandardError rescue",
                "AnError rescue",
                "Exception rescue"
            ],
            correct: 2,
            explanation: "<code>AnError</code>は<code>Exception</code>を直接継承しているため、引数なし<code>rescue</code>（StandardError）にも<code>rescue StandardError</code>にもマッチしません。<code>rescue AnError</code>でキャッチされます。"
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
                "Bare rescue",
                "StandardError rescue",
                "Exception rescue",
                "AnError rescue"
            ],
            correct: 2,
            explanation: "<code>rescue Exception</code>が<code>rescue AnError</code>より先にあるため、<code>Exception</code>のサブクラスである<code>AnError</code>はここでキャッチされます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `begin
  "hello".world
rescue => ex
  p ex.class
end`,
            choices: ["StandardError", "Exception", "NameError", "NoMethodError"],
            correct: 3,
            explanation: "存在しないメソッドを呼び出すと<code>NoMethodError</code>が発生します。<code>NoMethodError</code>は<code>NameError</code>のサブクラスです。"
        },
        {
            question: "rescue内でraiseを引数なしで呼ぶとどうなりますか？",
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
            choices: ["CustomError", "StandardError", "Exception", "RuntimeError"],
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
                "hello のみ",
                "hi のみ",
                "Ensure called! と hello",
                "Ensure called! と hi"
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
            choices: ["true と true", "true と false", "false と true", "false と false"],
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
                "Identity と Identity",
                "Class と Identity",
                "Object と Identity",
                "Class と Object"
            ],
            correct: 1,
            explanation: "クラスメソッドの<code>self</code>は<code>Identity</code>クラスで、<code>self.class</code>は<code>Class</code>。<code>Class.class</code>も<code>Class</code>。インスタンスの<code>self.class</code>は<code>Identity</code>。"
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
            choices: ["Mixin", "Class", "Object", "Identity"],
            correct: 3,
            explanation: "モジュールをincludeしても、<code>self</code>は現在のオブジェクトを参照します。<code>Identity</code>のインスタンスなので<code>Identity</code>が返ります。"
        },
        {
            question: "Classクラスのスーパークラスはどれですか？",
            code: null,
            choices: ["Object", "Module", "BasicObject", "Class"],
            correct: 1,
            explanation: "<code>Class</code>は<code>Module</code>のサブクラスです。<code>Module</code>は<code>Object</code>のサブクラスです。"
        }
    ],

    // セット5: モジュール・標準ライブラリ・その他（10問）
    set5: [
        {
            question: "モジュールのself.メソッドについて、次のコードの結果として正しいものはどれですか？",
            code: `module Mixin
  def self.greet
    puts "Hello World!"
  end
end
class SomeClass
  include Mixin
end`,
            choices: [
                "Mixin.greetは出力されるが、SomeClass.greetは例外",
                "SomeClass.greetは出力されるが、Mixin.greetは例外",
                "両方出力される",
                "両方例外が発生する"
            ],
            correct: 0,
            explanation: "モジュールの<code>self.greet</code>はモジュールの特異メソッドです。<code>include</code>してもクラスメソッドとしては使えません。"
        },
        {
            question: "extendでモジュールを取り込んだ場合の呼び出し方はどれですか？",
            code: `module Mixin
  def greet
    puts "Hello World!"
  end
end
class SomeClass
  extend Mixin
end`,
            choices: [
                "Mixin.greet",
                "SomeClass.new.greet",
                "SomeClass.greet",
                "Mixin.new.greet"
            ],
            correct: 2,
            explanation: "<code>extend</code>はモジュールのメソッドを特異メソッド（クラスメソッド）として取り込みます。<code>SomeClass.greet</code>で呼び出せます。"
        },
        {
            question: "includeでモジュールを取り込んだ場合の呼び出し方はどれですか？",
            code: `module Mixin
  def greet
    puts "Hello World!"
  end
end
class SomeClass
  include Mixin
end`,
            choices: [
                "Mixin.greet",
                "SomeClass.new.greet",
                "SomeClass.greet",
                "Mixin.new.greet"
            ],
            correct: 1,
            explanation: "<code>include</code>はモジュールのメソッドをインスタンスメソッドとして取り込みます。<code>SomeClass.new.greet</code>で呼び出せます。"
        },
        {
            question: "Enumerableを使うために実装が必要なメソッドはどれですか？",
            code: `class Alphabet
  include Enumerable
  def initialize
    @letters = ("A".."Z").to_a
  end
  def __(1)__
    @letters.each { |e| yield e }
  end
end`,
            choices: ["all", "each", "to_a", "to_enum"],
            correct: 1,
            explanation: "<code>Enumerable</code>モジュールは<code>each</code>メソッドの実装を前提としています。<code>each</code>を元に他のメソッドが実装されます。"
        },
        {
            question: "Comparableモジュールを使うために実装が必要な演算子はどれですか？",
            code: `class TShirt
  include Comparable
  SIZES = [:xs, :s, :m, :l, :xl, :xxl]
  def initialize(size)
    @size = size
  end
  attr_reader :size
  def __(1)__
    SIZES.index(size) <=> SIZES.index(other.size)
  end
end`,
            choices: ["==", "<=>", ">", "compare"],
            correct: 1,
            explanation: "<code>Comparable</code>は<code><=></code>演算子の実装だけで、<code>==</code>, <code><</code>, <code>></code>, <code><=</code>, <code>>=</code>などの比較メソッドをすべて提供します。"
        },
        {
            question: "Date#<< と Date#>> の意味として正しいものはどれですか？",
            code: `require "date"
date = Date.new(2000, 2, 24)
puts(date << 12)
puts(date >> 12)`,
            choices: [
                "12日前と12日後",
                "12日後と12日前",
                "12ヶ月前と12ヶ月後",
                "12年前と12年後"
            ],
            correct: 2,
            explanation: "<code><<</code>は指定した月数だけ前の日付を、<code>>></code>は指定した月数だけ後の日付を返します。結果は1999-02-24と2001-02-24です。"
        },
        {
            question: "文字列からテンプレートに従って時刻を解析するメソッドはどれですか？",
            code: `require "time"
t = Time.__(1)__("00000024021993", "%S%M%H%d%m%Y")
puts t.iso8601`,
            choices: ["format", "parse", "strftime", "strptime"],
            correct: 3,
            explanation: "<code>strptime</code>はテンプレートを使用して文字列から時刻を解析します。<code>strftime</code>は逆に時刻を文字列にフォーマットします。"
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
                "include Singleton",
                "extend Singleton",
                "using Singleton",
                "singletonize"
            ],
            correct: 0,
            explanation: "<code>include Singleton</code>でSingletonパターンを実装します。<code>new</code>がprivateになり、<code>instance</code>メソッドで唯一のインスタンスを取得します。"
        },
        {
            question: "Forwardableでメソッドを委譲するためのメソッドはどれですか？",
            code: `require 'forwardable'
class List
  extend Forwardable
  def initialize
    @contents = []
  end
  __(1)__ :@contents, :push
  __(1)__ :@contents, :[]
end`,
            choices: ["forward", "def_forwarder", "def_delegator", "define"],
            correct: 2,
            explanation: "<code>def_delegator</code>はメソッド呼び出しを指定したオブジェクトに委譲します。<code>Forwardable</code>モジュールの主要メソッドです。"
        },
        {
            question: "privateメソッドのアクセス制御を変更する方法として不適切なものはどれですか？",
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
                "public :greet",
                "protected :greet",
                "def greet; super; end",
                "protected :greetは外部から呼び出せない"
            ],
            correct: 1,
            explanation: "<code>protected</code>にすると同じクラスかサブクラスのインスタンスからしか呼び出せず、外部から<code>ChildClass.new.greet</code>で呼び出すと<code>NoMethodError</code>になります。"
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
