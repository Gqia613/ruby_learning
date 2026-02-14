const questions = {
    // セット1: 基礎・文法（10問）
    set1: [
        {
            question: "Rubyにおける真の値として正しいものをすべて選んだ場合、正しい組み合わせはどれですか？",
            code: null,
            choices: [
                '""（空文字列）と 0',
                'false と nil',
                '0 と nil',
                '"" と false'
            ],
            correct: 0,
            explanation: 'Rubyでは<code>false</code>と<code>nil</code>のみが偽の値です。空文字列<code>""</code>や<code>0</code>は真の値として評価されます。これは他の多くの言語と異なる点です。'
        },
        {
            question: "Rubyの予約語として正しいものをすべて選んだ場合、正しい組み合わせはどれですか？",
            code: null,
            choices: [
                "each と rand",
                "class と true",
                "send と each",
                "rand と class"
            ],
            correct: 1,
            explanation: "<code>class</code>と<code>true</code>は予約語です。<code>each</code>、<code>rand</code>、<code>send</code>はメソッドであり予約語ではありません。"
        },
        {
            question: "Rubyの変数名として正しいものはどれですか？",
            code: null,
            choices: ["3y", "false", "_9class", "xyz$"],
            correct: 2,
            explanation: "変数名は数字から始められず、予約語は使用できず、英数字とアンダースコアのみ使用可能です。<code>_9class</code>はアンダースコアで始まり有効です。"
        },
        {
            question: '次のコードで「i like writing CODE」と出力されるものはどれですか？',
            code: '$code = "CODE"',
            choices: [
                'puts "i like writing #{$code}"',
                "puts 'i like writing #{$code}'",
                "puts 'i like writing #$code'",
                'puts "i like writing $code"'
            ],
            correct: 0,
            explanation: 'ダブルクォートで囲むと式展開が機能します。<code>#{$code}</code>で変数の値が展開されます。シングルクォートでは式展開されません。'
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `num = 025
puts num`,
            choices: ["nil", "025", "21", "25"],
            correct: 2,
            explanation: "先頭の0は8進法を示します。025（8進法）= 2×8 + 5 = 21（10進法）です。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `x = "Hello"
y = x.empty? ? 1 : 2
p y`,
            choices: ["1", "2", '"Hello"', "true"],
            correct: 1,
            explanation: '<code>"Hello"</code>は空でないため<code>x.empty?</code>は<code>false</code>。三項演算子で偽の場合の値<code>2</code>が返されます。'
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `amount = 120
size = case amount
  when 1..120; "S"
  when 120..170; "M"
  when 170..200; "L"
  else "XL"
end
p size`,
            choices: ['"S"', '"M"', '"L"', '"XL"'],
            correct: 0,
            explanation: "case文は最初にマッチした<code>when</code>節を実行します。<code>1..120</code>に120は含まれるため、<code>\"S\"</code>が返されます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `item = "apple"
["banana", "carrot", "daikon"].each do |item|
  puts item
end
puts item`,
            choices: [
                "文法エラーが発生する",
                "例外が発生する",
                "banana carrot daikon daikon",
                "banana carrot daikon apple"
            ],
            correct: 3,
            explanation: "ブロック変数<code>item</code>はブロック内のローカルスコープを持つため、外部の<code>item</code>（apple）を上書きしません。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `x = 0
4.times do |i|
  x += i
end
p x`,
            choices: ["0", "4", "6", "10"],
            correct: 2,
            explanation: "<code>times</code>のブロック変数iは0, 1, 2, 3を順に取ります。合計は0+1+2+3=6です。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `puts 5 / 2`,
            choices: ["2.5", "2", "3", "エラーが発生する"],
            correct: 1,
            explanation: "整数同士の除算では結果も整数になります。5 / 2 は 2.5 ではなく 2 になります。小数が欲しい場合は<code>5.0 / 2</code>とします。"
        }
    ],

    // セット2: 文字列・配列・ハッシュ（10問）
    set2: [
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `s = "abcde"
p s.each_char.map { |i| i * 2 }`,
            choices: [
                "[97, 98, 99, 100, 101]",
                "[194, 196, 198, 200, 202]",
                '["a", "b", "c", "d", "e"]',
                '["aa", "bb", "cc", "dd", "ee"]'
            ],
            correct: 3,
            explanation: "<code>each_char</code>が各文字を取得し、<code>map</code>で各文字を2回繰り返します（文字列 * 整数 = 繰り返し）。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `p "cocoa".chars.tally`,
            choices: [
                "{99=>2, 111=>2, 97=>1}",
                "{?c=>2, ?o=>2, ?a=>1}",
                '{"c"=>2, "o"=>2, "a"=>1}',
                "実行時にエラーになる"
            ],
            correct: 2,
            explanation: "<code>tally</code>は要素の出現回数をハッシュで集計します。キーは文字列です。"
        },
        {
            question: '"blah blah blah"を"yay yay yay"に置換するために使うメソッドはどれですか？',
            code: 'puts "blah blah blah".__(?)__(/blah/, "yay")',
            choices: ["sub", "gsub", "replace", "replace_all"],
            correct: 1,
            explanation: "<code>gsub</code>は全置換、<code>sub</code>は最初の1つだけを置換します。全て置換するには<code>gsub</code>が必要です。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `["foo: abc", "bar: 100"].each do |i|
  p i.slice(/[0-9]+/)&.to_i
end`,
            choices: ["0 と 100", "nil と 100", "false と 100", "実行時にエラーになる"],
            correct: 1,
            explanation: "最初の要素では数字が見つからず<code>nil</code>、safe navigator<code>&.to_i</code>は<code>nil</code>をそのまま返します。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `x = [1,2,3,4,5,6,7,8]
y = x
x.reject! { |e| e.even? }
p y`,
            choices: [
                "[1, 2, 3, 4, 5, 6, 7, 8]",
                "[2, 4, 6, 8]",
                "[1, 3, 5, 7]",
                "nil"
            ],
            correct: 2,
            explanation: "<code>y = x</code>で同じオブジェクトを参照するため、<code>reject!</code>の破壊的変更は<code>y</code>にも反映されます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `a = [ 2, 4, 6, 8, 10 ]
a.shift
a.pop
a.push(12)
p a`,
            choices: [
                "[2, 4, 6, 8, 10, 12]",
                "[2, 4, 6, 8, 10]",
                "[4, 6, 8, 12]",
                "[4, 6, 8]"
            ],
            correct: 2,
            explanation: "<code>shift</code>で先頭(2)を削除、<code>pop</code>で末尾(10)を削除、<code>push(12)</code>で12を追加します。"
        },
        {
            question: "配列[7, 5, 3]を取得するために__(?)__に入る正しい記述をすべて選んでください。",
            code: `x = [ 9, 7, 5, 3, 1 ]
p x[__(?)__]`,
            choices: ["1, 3", "1..-1", "-3..-1", "-4..-2"],
            correct: [0, 3],
            explanation: "<code>x[1, 3]</code>は位置1から3要素で[7, 5, 3]。<code>x[-4..-2]</code>は末尾から4番目～2番目で[7, 5, 3]です。<code>x[1..-1]</code>は[7, 5, 3, 1]、<code>x[-3..-1]</code>は[5, 3, 1]になります。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `puts "42A7".to_i`,
            choices: ["42", "42A7", "17063", "実行時にエラーになる"],
            correct: 0,
            explanation: "<code>to_i</code>は最初の数字部分のみを解析して整数に変換します。\"42A7\"からは42が取得されます。"
        },
        {
            question: "ハッシュhのキー:cの存在を確認できない（存在しない）メソッドはどれですか？",
            code: "h = {a: 2, b: 4, c: 6, d: 8, e: 10}",
            choices: ["h.has_key?(:c)", "h.contain?(:c)", "h.include?(:c)", "h.key?(:c)"],
            correct: 1,
            explanation: "<code>contain?</code>はHashクラスに存在しないメソッドです。<code>has_key?</code>、<code>include?</code>、<code>key?</code>、<code>member?</code>は全て使用可能です。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `p %i(x1 x2 x3)`,
            choices: ['"x1 x2 x3"', "[1, 2, 3]", '["x1", "x2", "x3"]', "[:x1, :x2, :x3]"],
            correct: 3,
            explanation: "<code>%i()</code>はシンボルの配列リテラルです。各要素がシンボルとして作成されます。"
        }
    ],

    // セット3: オブジェクト指向・クラス（10問）
    set3: [
        {
            question: "クラスのスーパークラスを明示的に指定しなかった場合、どうなりますか？",
            code: null,
            choices: [
                "例外UndefinedParentClassErrorが発生する",
                "文法エラーが発生する",
                "Moduleクラスがスーパークラスになる",
                "Objectクラスがスーパークラスになる"
            ],
            correct: 3,
            explanation: "Rubyではすべてのクラスはデフォルトで<code>Object</code>クラスを継承します。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `class Object
  def moo
    puts "MOO!"
  end
end

"Cow".moo`,
            choices: ["何も出力されない", "実行時にエラーになる", "MOO!", "nil"],
            correct: 2,
            explanation: "すべてのオブジェクトは<code>Object</code>から継承するため、追加したメソッドは全てのオブジェクトで利用可能になります。"
        },
        {
            question: "コンストラクタとして使用されるメソッド名は何ですか？",
            code: `class Shouter
  def __(?)__(message)
    @message = message
  end
end

g = Shouter.new("Hello!")`,
            choices: ["Shouter", "new", "initialize", "__init__"],
            correct: 2,
            explanation: "<code>initialize</code>はRubyのコンストラクタメソッドです。<code>new</code>が呼ばれると自動的に実行されます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `class Foo
  attr_reader :var
  def initialize
    @var = "apple"
  end
end

class Bar < Foo
  def initialize
    @var = "banana"
    super
  end
end

bar = Bar.new
puts bar.var`,
            choices: ["apple", "banana", "何も出力されない", "実行時にエラーになる"],
            correct: 0,
            explanation: "<code>super</code>で親クラスの<code>initialize</code>が実行され、<code>@var</code>が\"apple\"に上書きされます。"
        },
        {
            question: "Rubyの継承について正しいものはどれですか？",
            code: null,
            choices: [
                "多重継承ができる",
                "単一継承のみサポートしている",
                "継承はできない",
                "インターフェースを実装する"
            ],
            correct: 1,
            explanation: "Rubyは単一継承のみをサポートしています。多重継承の代わりにMix-in（モジュールのinclude）を使用します。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `module Greetable
  def greet
    "Hello!"
  end
end

class Person
  include Greetable
end

puts Person.new.greet`,
            choices: ["Hello!", "nil", "エラーが発生する", "Greetable"],
            correct: 0,
            explanation: "<code>include</code>を使うとモジュールのメソッドをインスタンスメソッドとして利用できます。これをMix-inと呼びます。"
        },
        {
            question: "クラスメソッドを定義する正しい方法はどれですか？",
            code: null,
            choices: [
                "def method_name; end",
                "def self.method_name; end",
                "def @method_name; end",
                "class def method_name; end"
            ],
            correct: 1,
            explanation: "<code>def self.method_name</code>でクラスメソッドを定義します。インスタンスを作成せずにクラス名.メソッド名で呼び出せます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `class Counter
  @@count = 0
  def initialize
    @@count += 1
  end
  def self.count
    @@count
  end
end

Counter.new
Counter.new
puts Counter.count`,
            choices: ["0", "1", "2", "エラーが発生する"],
            correct: 2,
            explanation: "<code>@@count</code>はクラス変数で、クラスとすべてのインスタンスで共有されます。2回newすると2になります。"
        },
        {
            question: "アクセサメソッドについて正しいものはどれですか？",
            code: null,
            choices: [
                "attr_reader は読み書き両方のメソッドを定義する",
                "attr_writer は読み取り専用のメソッドを定義する",
                "attr_accessor は読み書き両方のメソッドを定義する",
                "attr_accessor は書き込み専用のメソッドを定義する"
            ],
            correct: 2,
            explanation: "<code>attr_reader</code>は読み取り専用、<code>attr_writer</code>は書き込み専用、<code>attr_accessor</code>は読み書き両方を定義します。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `module A
  def hello
    "A"
  end
end

module B
  def hello
    "B"
  end
end

class C
  include A
  include B
end

puts C.new.hello`,
            choices: ["A", "B", "AB", "エラーが発生する"],
            correct: 1,
            explanation: "複数のモジュールをincludeした場合、後からincludeしたモジュールのメソッドが優先されます。"
        }
    ],

    // セット4: 例外処理・ブロック（10問）
    set4: [
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `class SomeError < StandardError; end
class SomeOtherError < SomeError; end

def meth1
  raise SomeOtherError.new("error")
end

begin
  meth1
rescue SomeError
  print "SomeError"
rescue SomeOtherError
  print "SomeOtherError"
end`,
            choices: ["文法エラー", "SomeError", "SomeErrorSomeOtherError", "SomeOtherError"],
            correct: 1,
            explanation: "<code>rescue</code>は上から順に評価されます。<code>SomeOtherError</code>は<code>SomeError</code>のサブクラスなので、最初の<code>rescue</code>でキャッチされます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `begin
  ans = 100/0
  puts ans
rescue ZeroDivisionError
  puts "Error: ZeroDivisionError"
  exit 1
ensure
  puts "DONE!"
end`,
            choices: [
                "0 と DONE!",
                "Error: ZeroDivisionError のみ",
                "Error: ZeroDivisionError と DONE!",
                "エラーが発生する"
            ],
            correct: 2,
            explanation: "<code>ensure</code>ブロックは例外の有無に関わらず必ず実行されます。<code>exit</code>の前に実行されます。"
        },
        {
            question: "ensureブロックの説明として正しいものはどれですか？",
            code: null,
            choices: [
                "例外が発生した場合のみ実行される",
                "例外が発生しなかった場合のみ実行される",
                "例外の有無に関わらず必ず実行される",
                "retryする前に実行される"
            ],
            correct: 2,
            explanation: "<code>ensure</code>ブロックは例外が発生してもしなくても必ず実行されます。ファイルのクローズなどの後処理に使用します。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `def greet
  yield "Ruby"
end

greet { |name| puts "Hello, #{name}!" }`,
            choices: ["Hello, Ruby!", "Hello, !", "Ruby", "エラーが発生する"],
            correct: 0,
            explanation: "<code>yield</code>はメソッドに渡されたブロックを実行します。\"Ruby\"が引数としてブロックに渡されます。"
        },
        {
            question: "Procの説明として正しいものはどれですか？",
            code: null,
            choices: [
                "Procはブロックをオブジェクト化したものである",
                "Procはメソッドと同じである",
                "Procは変数に代入できない",
                "ProcはRubyには存在しない"
            ],
            correct: 0,
            explanation: "Procはブロックをオブジェクトとして扱えるようにしたものです。変数に代入したり、メソッドの引数として渡したりできます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `prc = Proc.new { |x| x * 2 }
puts prc.call(5)`,
            choices: ["5", "10", "nil", "エラーが発生する"],
            correct: 1,
            explanation: "<code>Proc.new</code>でProcオブジェクトを作成し、<code>call</code>メソッドで実行します。5 * 2 = 10が結果です。"
        },
        {
            question: "lambdaとProcの違いとして正しいものはどれですか？",
            code: null,
            choices: [
                "lambdaは引数の数をチェックしないが、Procはチェックする",
                "lambdaは引数の数をチェックするが、Procはチェックしない",
                "lambdaとProcに違いはない",
                "lambdaはブロックを受け取れない"
            ],
            correct: 1,
            explanation: "lambdaは引数の数が合わないとArgumentErrorが発生しますが、Procは余分な引数を無視し、足りない引数はnilになります。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `lmd = ->(x, y) { x + y }
puts lmd.call(3, 4)`,
            choices: ["3", "4", "7", "エラーが発生する"],
            correct: 2,
            explanation: "<code>->()</code>はlambdaのショートハンド記法です。引数x=3, y=4を受け取り、3 + 4 = 7を返します。"
        },
        {
            question: "カスタム例外クラスを定義する正しい方法はどれですか？",
            code: null,
            choices: [
                "class MyError; end",
                "class MyError < StandardError; end",
                "exception MyError; end",
                "define_error :MyError"
            ],
            correct: 1,
            explanation: "カスタム例外クラスは通常<code>StandardError</code>を継承して定義します。<code>rescue</code>でデフォルトでキャッチされます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `count = 0
begin
  count += 1
  raise if count < 3
rescue
  retry
end
puts count`,
            choices: ["1", "2", "3", "無限ループ"],
            correct: 2,
            explanation: "<code>retry</code>はbeginブロックを最初から再実行します。countが3になるまで例外が発生し、最終的に3が出力されます。"
        }
    ],

    // セット5: ファイル操作・その他（10問）
    set5: [
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `File.write("test", "hellorubyworld\\n")
File.open("test") do |file|
  file.seek(5)
  print file.gets
end`,
            choices: ["hello", "rubyworld", "hellor", "orubyworld"],
            correct: 1,
            explanation: "<code>seek(5)</code>で5バイト目（0から数えて）に移動し、<code>gets</code>で行末まで読み取ります。"
        },
        {
            question: "openメソッドの第2引数を省略した場合のデフォルトモードはどれですか？",
            code: 'file = open("sample.txt")',
            choices: ["r（読み込み専用）", "r+（読み書き）", "w（書き込み専用）", "a（追記）"],
            correct: 0,
            explanation: "デフォルトは読み込みモード（<code>r</code>）です。ファイルを読むだけなら第2引数は省略できます。"
        },
        {
            question: "Dirクラスに存在しないクラスメソッドはどれですか？",
            code: null,
            choices: ["Dir.pwd", "Dir.rename", "Dir.chdir", "Dir.delete"],
            correct: 1,
            explanation: "<code>rename</code>は<code>File</code>クラスのメソッドです。<code>Dir</code>クラスにはありません。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `p "hello ruby world"[6,4]`,
            choices: ['"hello "', '"ruby"', '" world"', "実行時にエラーになる"],
            correct: 1,
            explanation: "<code>[6,4]</code>はインデックス6から4文字を取得します。\"hello \"(6文字)の後の\"ruby\"が取得されます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `str = "bat"
str[1,1] = "o"
p str`,
            choices: ['"boo"', '"bot"', '"oat"', '"o"'],
            correct: 1,
            explanation: "<code>str[1,1] = \"o\"</code>はインデックス1から1文字を\"o\"に置換します。\"bat\"→\"bot\"になります。"
        },
        {
            question: "先頭の$を削除するメソッドはどれですか？",
            code: `puts "$foo$".__(?)__("$")
# 出力: foo$`,
            choices: ["sub", "chop", "delete", "delete_prefix"],
            correct: 3,
            explanation: "<code>delete_prefix</code>は文字列の先頭から指定した文字列を削除します。"
        },
        {
            question: "範囲オブジェクトを配列に変換するメソッドはどれですか？",
            code: `r = "a".."e"
p r.__(?)__
# 出力: ["a", "b", "c", "d", "e"]`,
            choices: ["array", "to_ary", "to_a", "to_array"],
            correct: 2,
            explanation: "<code>to_a</code>はオブジェクトを配列に変換するメソッドです。範囲オブジェクトでも使用できます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `p [0,1,2,3,4,5].find {|x| x < 3}`,
            choices: ["[0, 1, 2]", "0", "[0, 1, 2, 3]", "true"],
            correct: 1,
            explanation: "<code>find</code>（または<code>detect</code>）は条件に最初にマッチした要素を1つだけ返します。"
        },
        {
            question: "配列を降順ソートする方法として正しいものはどれですか？",
            code: `# [16, 8, 4, 2, 1] を得たい
[1,16,8,4,2].__(?)__`,
            choices: [
                "sort_by { |x| -x } または sort.reverse",
                "sort_reverse",
                "reverse.sort",
                "sort_desc"
            ],
            correct: 0,
            explanation: "<code>sort_by { |x| -x }</code>または<code>sort.reverse</code>で降順にソートできます。"
        },
        {
            question: "次のコードの実行結果として正しいものはどれですか？",
            code: `a, b, *c = [1, 2, 3, 4, 5]
p c`,
            choices: ["[3, 4, 5]", "[1, 2]", "3", "[3]"],
            correct: 0,
            explanation: "<code>*c</code>は可変長引数（splat演算子）で、残りのすべての要素を配列として受け取ります。a=1, b=2, c=[3, 4, 5]となります。"
        }
    ]
};

// セット情報
const setInfo = {
    set1: { name: "セット1", description: "基礎・文法", count: 10 },
    set2: { name: "セット2", description: "文字列・配列・ハッシュ", count: 10 },
    set3: { name: "セット3", description: "オブジェクト指向・クラス", count: 10 },
    set4: { name: "セット4", description: "例外処理・ブロック", count: 10 },
    set5: { name: "セット5", description: "ファイル操作・その他", count: 10 }
};
