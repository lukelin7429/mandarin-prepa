# -*- coding: utf-8 -*-
"""Demo content for Mandarin Prépa.

Syntax inside a text body:
  - words are separated by spaces (spaces are removed on screen);
  - `词=glose` attaches a French gloss (the word also becomes a flashcard);
  - `词@pin yin=glose` overrides the automatic pinyin;
  - a blank line starts a new paragraph.

When the real class materials arrive, replace these texts (or add new ones)
and run:  python3 tools/build_content.py
"""

# ---------------------------------------------------------------------------
# Reading texts
# ---------------------------------------------------------------------------
TEXTS = [
    {
        "id": "gaokao",
        "title": "高考：一场 改变 命运 的 考试？",
        "title_fr": "Le gaokao : un examen qui change une vie ?",
        "note_fr": "Texte de démonstration (niveau HSK 4-5), à remplacer par l'article étudié en classe.",
        "body": """
每年 六月 七日 和 八日 ， 一千 多 万 中国 高中生 走进 考场=salle d'examen ， 参加=participer 全国 高等 学校 招生=admission (recrutement d'étudiants) 考试 ， 也 就是 “ 高考=gaokao (concours d'entrée à l'université) ” 。 对 很多 家庭 来说 ， 高考 不 只是 一 场 考试 ， 而是 决定=décider 孩子 未来=avenir 的 关键=clé, décisif 时刻=moment 。

高考 的 分数=note, score 几乎=presque 决定 学生 能 上 哪 所 大学 。 好 大学 意味着=signifier, impliquer 好 工作 ， 好 工作 意味着 更 高 的 收入=revenu 和 社会 地位=statut 。 所以 很多 学生 从 小学 开始 就 上 补习班=cours de soutien privé ， 高三=terminale (3e année de lycée) 的 时候 每天 学习 十 几 个 小时 ， 周末 也 很少 休息 。

支持=soutenir 高考 的 人 认为=estimer, penser ， 这 是 一 种 相对=relativement 公平=équitable 的 制度=système, institution ： 不管=quel que soit 家庭 背景=milieu, contexte 如何 ， 只要=pourvu que 努力 学习 ， 农村=campagne, zone rurale 的 孩子 也 有 机会 考上 名牌大学=université prestigieuse 。 反对=s'opposer à 的 人 则 认为 ， 高考 给 学生 带来 了 巨大=énorme 的 压力=pression ， 让 教育 变成 了 “ 应试教育=éducation tournée vers les examens ” ， 学生 只 会 背书@bèishū=apprendre par cœur 和 做题 ， 缺少=manquer de 创造力=créativité 。

近年来 ， 中国 政府=gouvernement 推出 了 一些 改革=réforme ， 比如 减少=réduire 作业 、 限制=limiter 校外 培训 机构=organisme ， 希望 减轻=alléger 学生 的 负担=charge, fardeau 。 可是 ， 只要 好 大学 的 名额=nombre de places 有限=limité ， 竞争=concurrence 就 不 会 消失=disparaître 。 高考 到底=au fond, finalement 是 改变 命运=destin 的 机会 ， 还是 压 在 年轻人 身上 的 一 座 大山 ？ 这个 问题 仍然=toujours, encore 没有 简单 的 答案 。
""",
        "quiz": [
            {"q": "Quand le gaokao a-t-il lieu ?", "a": "Les 7 et 8 juin", "wrong": ["En septembre", "Les 1er et 2 janvier", "Chaque samedi"]},
            {"q": "Selon ses partisans, le gaokao est…", "a": "un système relativement équitable", "wrong": ["un examen trop facile", "réservé aux enfants des villes", "inutile pour trouver un emploi"]},
            {"q": "Que reprochent ses opposants au gaokao ?", "a": "Il crée une forte pression et étouffe la créativité", "wrong": ["Il coûte trop cher aux familles", "Il est organisé trop souvent", "Il ne concerne que les maths"]},
            {"q": "Pourquoi la concurrence ne disparaîtra-t-elle pas ?", "a": "Les places dans les bonnes universités sont limitées", "wrong": ["Le gouvernement interdit les réformes", "Les élèves aiment la compétition", "Les universités sont gratuites"]},
        ],
    },
    {
        "id": "peterpan",
        "title": "彼得·潘",
        "title_fr": "Peter Pan (adaptation simplifiée)",
        "note_fr": "Adaptation libre et simplifiée du roman de J. M. Barrie (1911), écrite pour cette application.",
        "body": """
所有 的 孩子 都 会 长大=grandir ， 只有 一 个 孩子 例外=exception ， 他 的 名字 叫 彼得·潘@Bǐdé Pān=Peter Pan 。

一 天 晚上 ， 温迪@Wēndí=Wendy 和 两 个 弟弟 正在 睡觉 ， 一 个 男孩 从 窗户=fenêtre 飞=voler (dans les airs) 了 进来 。 他 穿着 用 树叶=feuille d'arbre 做 的 衣服 ， 身边 跟着 一 个 小小 的 仙女=fée ， 叫 小叮当@Xiǎo Dīngdāng=Clochette (la fée) 。

“ 你 为什么 不 想 长大 ？ ” 温迪 问 。

“ 因为 长大 以后 ， 就 要 去 上学 、 去 上班 ， 每天 都 要 做 很多 无聊=ennuyeux 的 事 。 ” 彼得 回答=répondre ， “ 我 想 永远=pour toujours 做 一 个 小 男孩 ， 永远 开心 地 玩 。 ”

彼得 教 孩子们 飞 。 只要 想着 快乐 的 事情 ， 再 撒上=saupoudrer 一点 仙尘@xiānchén=poussière de fée ， 他们 就 能 飞 起来 。 他们 飞过 伦敦=Londres 的 屋顶=toit ， 飞向 第二 颗 星星=étoile 右边 的 永无岛@Yǒngwú Dǎo=le Pays imaginaire 。

在 永无岛 上 ， 有 美人鱼=sirène 、 印第安人 ， 还有 可怕=effrayant 的 胡克船长@Húkè chuánzhǎng=le capitaine Crochet 。 胡克 船长 最 怕=avoir peur de 一 条 鳄鱼=crocodile ， 因为 那 条 鳄鱼 吞下=avaler 了 一 个 闹钟=réveil ， 走到 哪里 都 会 发出 “ 嘀嗒@dīdā=tic-tac 、 嘀嗒 ” 的 声音 。

可是 ， 温迪 慢慢 明白=comprendre 了 ： 不管 永无岛 多么 好玩 ， 家里 还有 爸爸 妈妈 在 等 他们 。 长大 虽然 不 容易 ， 但 也 是 生命=la vie 的 一 部分 。
""",
        "quiz": [
            {"q": "Comment Peter Pan entre-t-il dans la chambre ?", "a": "Il entre par la fenêtre en volant", "wrong": ["Par la porte", "Par la cheminée", "Il était caché sous le lit"]},
            {"q": "Pourquoi Peter ne veut-il pas grandir ?", "a": "Les adultes font beaucoup de choses ennuyeuses", "wrong": ["Il a peur du capitaine Crochet", "Il veut devenir pirate", "Ses parents le lui interdisent"]},
            {"q": "Pourquoi le capitaine Crochet a-t-il peur du crocodile ?", "a": "Le crocodile a avalé un réveil et fait « tic-tac »", "wrong": ["Le crocodile est son ancien ami", "Le crocodile vole comme Peter", "Le crocodile garde l'île"]},
        ],
    },
]

# ---------------------------------------------------------------------------
# Colle documents (oral simulation).  Themes inspired by the HEC jury reports
# (2023-2025): society topics from mainland China and Taiwan.
# ---------------------------------------------------------------------------
COLLES = [
    {
        "id": "neijuan",
        "title": "“ 内卷 ” 还是 “ 躺平 ” ？",
        "title_fr": "« Involution » ou « rester allongé » ?",
        "body": """
最近 几 年 ， “ 内卷@nèijuǎn=involution (compétition excessive et stérile) ” 和 “ 躺平@tǎngpíng=« rester allongé », renoncer à la course ” 成 了 中国 年轻人 最 常用 的 两 个 词 。 “ 内卷 ” 原来 是 一 个 学术=académique 概念=concept ， 现在 用来 形容=décrire 一 种 过度=excessif 竞争 ： 大家 都 更加 努力 ， 可是 结果=résultat 并 没有 变好 ， 只是 让 每 个 人 都 更 累 。 比如 ， 公司 里 有 人 每天 加班=faire des heures sup. 到 晚上 十 点 ， 其他 同事=collègue 也 不 敢 早 下班 。

面对=faire face à 这 种 压力 ， 一些 年轻人 选择=choisir “ 躺平 ” ： 不 买房 、 不 结婚 、 不 追求=rechercher, poursuivre 高 收入 ， 只 做 能 养活=faire vivre, nourrir 自己 的 工作 。 他们 说 ， 与其=plutôt que 拼命=se tuer à la tâche 工作 却 看不到 希望 ， 不如 降低=baisser 欲望=désir ， 过 简单 的 生活 。

有 人 批评=critiquer “ 躺平 ” 是 消极=passif, négatif 、 不 负责任 的 态度=attitude ， 也 有 人 认为 这 是 年轻人 对 不 合理 社会 规则 的 一 种 无声 反抗=résistance, révolte 。 专家=expert 指出=souligner ， 如果 越来越多 的 年轻人 不 愿意 消费=consommer 、 不 愿意 生 孩子 ， 中国 经济 的 增长=croissance 可能 会 受到 影响=influence, impact 。
""",
        "questions": [
            {"zh": "你 怎么 理解 “ 内卷 ” 这个 词 ？ 法国 有 没有 类似 的 现象 ？", "fr": "Comment comprends-tu le mot « neijuan » ? Existe-t-il un phénomène semblable en France ?"},
            {"zh": "你 觉得 “ 躺平 ” 是 一 种 反抗 还是 一 种 逃避 ？", "fr": "Selon toi, « tangping » est-ce une forme de résistance ou une fuite ?"},
            {"zh": "政府 应该 怎么 做 才 能 减少 “ 内卷 ” ？", "fr": "Que devrait faire le gouvernement pour réduire l'« involution » ?"},
        ],
    },
    {
        "id": "quanzhi",
        "title": "“ 全职 儿女 ” ： 在 家 “ 上班 ” 的 年轻人",
        "title_fr": "Les « enfants à plein temps » : de jeunes adultes « employés » chez leurs parents",
        "body": """
在 中国 的 社交 媒体=médias 上 ， 出现=apparaître 了 一 个 新 词 ： “ 全职儿女@quánzhí érnǚ=« enfants à plein temps » ” 。 这些 年轻人 大学 毕业=obtenir son diplôme 以后 没有 找到 满意=satisfaisant 的 工作 ， 于是=alors, du coup 回到 父母 家 ， 帮 父母 做饭 、 打扫 、 买菜 、 陪=tenir compagnie 父母 聊天 ， 父母 每 个 月 给 他们 几千 元 的 “ 工资=salaire ” 。

据=selon 国家 统计局=Bureau national des statistiques 的 数据=données ， 2023 年 6 月 ， 中国 16 到 24 岁 年轻人 的 失业率=taux de chômage 超过=dépasser 了 20% 。 很多 毕业生 发现 ， 自己 学 的 专业=spécialité, filière 和 市场=marché 需要 的 工作 并 不 一致=correspondre, cohérent 。

有 人 觉得 “ 全职 儿女 ” 是 一 种 暂时=temporaire 的 休息 ， 可以 让 年轻人 减轻 压力 ， 重新 思考=réfléchir 自己 的 未来 ； 也 有 人 担心=s'inquiéter ， 长 时间 在 家 会 让 他们 离 社会 越来越 远 ， 失去=perdre 工作 能力 。 对 父母 来说 ， 这 既=à la fois 是 一 种 陪伴=compagnie ， 也 是 一 种 经济 负担 。
""",
        "questions": [
            {"zh": "你 觉得 “ 全职 儿女 ” 算不算 一 份 工作 ？", "fr": "Penses-tu qu'être « enfant à plein temps » soit un vrai travail ?"},
            {"zh": "为什么 大学 毕业生 找 工作 这么 难 ？", "fr": "Pourquoi est-il si difficile pour les diplômés de trouver un emploi ?"},
            {"zh": "在 法国 ， 年轻人 毕业 后 住 在 父母 家 常见 吗 ？", "fr": "En France, est-il courant que les jeunes vivent chez leurs parents après leurs études ?"},
        ],
    },
    {
        "id": "shuangxiu",
        "title": "高中生 有 权利 过 周末 吗 ？",
        "title_fr": "Les lycéens ont-ils droit au week-end ?",
        "body": """
在 中国 很多 地方 ， 高中生 每 周 只 休息 一 天 ， 甚至=même 半 天 。 周六 上课 、 晚上 上 自习=étude en autonomie ， 是 很多 高中 的 “ 传统=tradition ” 。 最近 ， 一些 省份=province 要求=exiger 高中 保证=garantir 学生 每 周 有 两 天 休息 ， 不 能 在 周末 组织=organiser 集体 补课=cours de rattrapage 。

支持 这 项 规定=règlement 的 家长 认为 ， 学生 需要 时间 睡觉 、 运动 、 发展 兴趣=centre d'intérêt ， 身心 健康 比 分数 更 重要 。 可是 也 有 家长 很 着急=inquiet, pressé ： “ 别的 学校 偷偷=en cachette 补课 ， 我们 的 孩子 不 补 就 会 落后=prendre du retard 。 ” 一些 学生 则 表示=déclarer ， 即使=même si 学校 放假 ， 父母 也 会 给 他们 报 补习班 ， 周末 反而=au contraire 更 累 。

专家 认为 ， 减轻 学生 负担 不 能 只 靠=compter sur 一 条 规定 ， 还 需要 改变 “ 唯分数论@wéi fēnshù lùn=« tout pour la note » ” 的 评价=évaluation 方式 。
""",
        "questions": [
            {"zh": "你 支持 高中生 双休 吗 ？ 为什么 ？", "fr": "Es-tu pour deux jours de repos par semaine pour les lycéens ? Pourquoi ?"},
            {"zh": "法国 的 预科班 学生 周六 也 要 考试 ， 你 怎么 看 ？", "fr": "En prépa, on a aussi des devoirs le samedi. Qu'en penses-tu ?"},
            {"zh": "什么 是 “ 唯 分数 论 ” ？ 你 同意 吗 ？", "fr": "Qu'est-ce que le « tout pour la note » ? Es-tu d'accord ?"},
        ],
    },
    {
        "id": "youmin",
        "title": "“ 数字 游民 ” ： 带着 电脑 去 旅行",
        "title_fr": "Les « nomades numériques » : voyager avec son ordinateur",
        "body": """
只要 有 一 台 电脑 和 网络 ， 就 可以 在 任何=n'importe quel 地方 工作 —— 这 就是 “ 数字游民@shùzì yóumín=nomade numérique ” 的 生活 方式=manière, mode 。 在 中国 ， 越来越多 的 年轻人 离开 北京 、 上海 这样 的 大 城市 ， 搬到 云南 大理 、 海南 等 风景=paysage 美丽 、 生活 成本=coût 较 低 的 地方 ， 一边 远程=à distance 工作 ， 一边 享受=profiter de 生活 。

疫情=épidémie 以后 ， 远程 办公 变得 更 普遍=répandu ， 这 让 数字 游民 的 数量=nombre 快速 增加=augmenter 。 一些 小 城市 也 看到 了 机会 ， 专门 为 他们 建立=créer, établir 了 共享 办公 空间 和 社区=communauté ， 希望 吸引=attirer 人才=talents ， 带动=stimuler 当地=local 经济 。

不过 ， 这 种 生活 并 不 像 社交 媒体 上 看起来 那么 轻松 。 很多 数字 游民 收入 不 稳定=stable ， 没有 社会 保险=assurance sociale ， 也 常常 感到 孤独=solitude, seul 。
""",
        "questions": [
            {"zh": "你 愿意 成为 数字 游民 吗 ？ 为什么 ？", "fr": "Aimerais-tu devenir nomade numérique ? Pourquoi ?"},
            {"zh": "远程 工作 对 公司 和 员工 有 什么 好处 和 坏处 ？", "fr": "Quels sont les avantages et les inconvénients du télétravail pour les entreprises et les salariés ?"},
            {"zh": "数字 游民 对 小 城市 的 发展 有 什么 影响 ？", "fr": "Quel impact les nomades numériques ont-ils sur le développement des petites villes ?"},
        ],
    },
    {
        "id": "jiehun",
        "title": "政府 花钱 鼓励 年轻人 结婚",
        "title_fr": "L'État paie pour encourager les jeunes à se marier",
        "body": """
近年来 ， 中国 的 结婚 人数 不断=sans cesse 减少 。 2024 年 ， 全国 只有 大约 610 万 对 新人 登记=enregistrer 结婚 ， 比 前 一 年 少 了 约 20% 。 为了 鼓励=encourager 年轻人 结婚 和 生 孩子 ， 一些 地方 政府 开始 发放=distribuer “ 结婚补贴@jiéhūn bǔtiē=prime au mariage ” ， 有的 城市 给 新婚 夫妻=couple marié 发 几百 到 一千 多 元 的 红包=enveloppe rouge (cadeau en argent) ， 有的 还 提供=offrir, fournir 购房 优惠=réduction, avantage 。

同时 ， 官方=officiel 也 提倡=promouvoir “ 简约婚礼@jiǎnyuē hūnlǐ=mariage simple ” ， 反对 高额 彩礼@cǎilǐ=dot (versée à la famille de la mariée) 和 铺张浪费=gaspillage ostentatoire ， 希望 减轻 年轻人 的 经济 压力 。

可是 ， 很多 年轻人 认为 ， 一千 元 的 补贴 解决=résoudre 不了 真正 的 问题 。 房价=prix de l'immobilier 高 、 工作 压力 大 、 养 孩子 的 成本 太 高 ， 才 是 他们 不 想 结婚 的 主要=principal 原因=raison 。 也 有 人 说 ， 结 不 结婚 是 个人 的 选择 ， 政府 不 应该 干预=intervenir 。
""",
        "questions": [
            {"zh": "你 认为 结婚 补贴 有用 吗 ？", "fr": "Penses-tu que les primes au mariage soient utiles ?"},
            {"zh": "年轻人 不 想 结婚 的 原因 有 哪些 ？", "fr": "Pour quelles raisons les jeunes ne veulent-ils pas se marier ?"},
            {"zh": "法国 政府 怎么 鼓励 生育 ？ 效果 怎么样 ？", "fr": "Comment l'État français encourage-t-il la natalité ? Avec quels résultats ?"},
        ],
    },
    {
        "id": "shixi",
        "title": "花钱 买 实习",
        "title_fr": "Payer pour faire un stage",
        "body": """
在 中国 ， 好 的 实习=stage 经历=expérience 常常 是 找 工作 的 “ 敲门砖@qiāoménzhuān=tremplin, sésame ” 。 但是 名企=grande entreprise renommée 的 实习 机会 很 少 ， 竞争 非常 激烈=intense, acharné 。 于是 ， 一 种 新 的 生意=business 出现 了 ： 一些 中介=intermédiaire, agence 公司 向 大学生 收取=percevoir, facturer 几千 元 甚至 几万 元 ， 帮 他们 安排=organiser 在 大 公司 实习 ， 或者 提供 一 份 “ 实习 证明=attestation ” 。

购买 实习 的 学生 说 ， 没有 亮眼 的 简历=CV ， 连 面试=entretien d'embauche 的 机会 都 没有 ， 花钱 是 “ 不得已=en dernier recours, faute de mieux ” 的 选择 。 可是 批评者 指出 ， 这 种 做法 不 公平 ： 家庭 条件=conditions 好 的 学生 可以 买到 更 好 的 机会 ， 而 普通=ordinaire 家庭 的 孩子 只 能 被 落 在 后面 。 更 严重=grave 的 是 ， 有些 “ 实习 ” 只是 假=faux 证明 ， 学生 其实 什么 也 没 学到 。
""",
        "questions": [
            {"zh": "你 觉得 花钱 买 实习 公平 吗 ？", "fr": "Trouves-tu juste de payer pour obtenir un stage ?"},
            {"zh": "实习 对 找 工作 有 多 重要 ？", "fr": "Quelle est l'importance d'un stage pour trouver un emploi ?"},
            {"zh": "学校 和 政府 应该 怎么 管理 这 种 现象 ？", "fr": "Comment les écoles et l'État devraient-ils encadrer ce phénomène ?"},
        ],
    },
]

# ---------------------------------------------------------------------------
# Phrase bank for the colle (structure of the oral)
# ---------------------------------------------------------------------------
PHRASES = [
    # (stage, chinese with spaces, french)
    ("intro", "我 今天 要 介绍 的 文章 题目 是 《 … 》 ， 发表 在 … 上 。", "L'article que je vais présenter s'intitule « … », publié dans …"),
    ("intro", "这 篇 文章 主要 讲 的 是 …", "Cet article traite principalement de …"),
    ("intro", "这 篇 文章 讨论 了 一 个 很 有 意思 的 社会 现象 。", "Cet article aborde un phénomène de société très intéressant."),
    ("synthese", "文章 分析 了 … 的 原因 和 影响 。", "L'article analyse les causes et les conséquences de …"),
    ("synthese", "首先 ， … 其次 ， … 最后 ， …", "D'abord, … ensuite, … enfin, …"),
    ("synthese", "一方面 ， … ； 另一方面 ， …", "D'un côté, … ; de l'autre, …"),
    ("synthese", "作者 认为 …", "L'auteur estime que …"),
    ("synthese", "根据 文章 的 数据 ， …", "Selon les chiffres de l'article, …"),
    ("commentaire", "我 认为 这 个 现象 反映 了 …", "Je pense que ce phénomène reflète …"),
    ("commentaire", "在 我 看来 ， …", "À mon avis, …"),
    ("commentaire", "我 同意 作者 的 看法 ， 因为 …", "Je suis d'accord avec l'auteur, car …"),
    ("commentaire", "我 不 完全 同意 这 种 看法 。", "Je ne suis pas tout à fait d'accord avec ce point de vue."),
    ("commentaire", "举 个 例子 ， …", "Prenons un exemple : …"),
    ("commentaire", "和 法国 相比 ， …", "Par rapport à la France, …"),
    ("commentaire", "这 不仅 是 中国 的 问题 ， 也 是 全世界 年轻人 的 问题 。", "Ce n'est pas seulement un problème chinois, c'est aussi celui des jeunes du monde entier."),
    ("conclusion", "总的来说 ， …", "Dans l'ensemble, …"),
    ("conclusion", "总之 ， 这 个 问题 没有 简单 的 答案 。", "Bref, cette question n'a pas de réponse simple."),
    ("entretien", "这 是 一 个 很 好 的 问题 ， 让 我 想 一 想 。", "C'est une très bonne question, laissez-moi réfléchir."),
    ("entretien", "不好意思 ， 您 能 再 说 一 遍 吗 ？", "Pardon, pourriez-vous répéter ?"),
    ("entretien", "您 的 意思 是 … 吗 ？", "Vous voulez dire que … ?"),
    ("entretien", "我 没有 想到 这 一点 ， 不过 我 觉得 …", "Je n'y avais pas pensé, mais je crois que …"),
]

# ---------------------------------------------------------------------------
# Extra thematic vocabulary (economy, society, debate) not tied to a text.
# (hanzi with spaces between words if needed, pinyin override or "", French)
# ---------------------------------------------------------------------------
EXTRA_VOCAB = [
    ("经济", "", "économie"),
    ("发展", "", "développement, se développer"),
    ("企业", "", "entreprise"),
    ("消费者", "", "consommateur"),
    ("市场", "", "marché"),
    ("投资", "", "investir, investissement"),
    ("出口", "", "exporter, exportation"),
    ("进口", "", "importer, importation"),
    ("就业", "", "emploi (marché de l'emploi)"),
    ("失业", "", "chômage, être au chômage"),
    ("通货膨胀", "", "inflation"),
    ("人口", "", "population"),
    ("老龄化", "", "vieillissement (de la population)"),
    ("出生率", "", "taux de natalité"),
    ("城市化", "", "urbanisation"),
    ("环境保护", "", "protection de l'environnement"),
    ("人工智能", "", "intelligence artificielle"),
    ("社交媒体", "", "réseaux sociaux"),
    ("现象", "", "phénomène"),
    ("原因", "", "cause, raison"),
    ("结果", "", "résultat, conséquence"),
    ("观点", "", "point de vue"),
    ("优点", "", "avantage, qualité"),
    ("缺点", "", "inconvénient, défaut"),
    ("解决", "", "résoudre"),
    ("问题", "", "problème, question"),
    ("政策", "", "politique (mesure publique)"),
    ("首先", "", "tout d'abord"),
    ("其次", "", "ensuite"),
    ("此外", "", "en outre"),
    ("然而", "", "cependant"),
    ("因此", "", "par conséquent"),
    ("总之", "", "bref, en somme"),
    ("一方面", "", "d'une part"),
    ("另一方面", "", "d'autre part"),
    ("在我看来", "", "à mon avis"),
    ("举个例子", "", "par exemple (prenons un exemple)"),
    ("值得注意的是", "", "il convient de noter que"),
]

# Single-syllable words for the tone game (hanzi, French)
TONE_WORDS = [
    ("妈", "maman"), ("麻", "chanvre"), ("马", "cheval"), ("骂", "gronder"),
    ("书", "livre"), ("学", "étudier"), ("好", "bien"), ("去", "aller"),
    ("天", "ciel, jour"), ("茶", "thé"), ("水", "eau"), ("饭", "repas, riz"),
    ("家", "maison"), ("钱", "argent"), ("买", "acheter"), ("卖", "vendre"),
    ("飞", "voler"), ("门", "porte"), ("想", "penser"), ("看", "regarder"),
    ("吃", "manger"), ("来", "venir"), ("走", "marcher"), ("大", "grand"),
    ("多", "beaucoup"), ("难", "difficile"), ("老", "vieux"), ("问", "demander"),
    ("书", "livre"), ("房", "logement"), ("懂", "comprendre"), ("累", "fatigué"),
    ("哥", "grand frère"), ("鱼", "poisson"), ("雨", "pluie"), ("路", "route"),
    ("风", "vent"), ("人", "personne"), ("手", "main"), ("树", "arbre"),
]
