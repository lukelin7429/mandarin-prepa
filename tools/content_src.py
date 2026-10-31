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
        "title": "高考：一个 人 考试，全家 一起 累",
        "title_fr": "Le gaokao : un seul candidat, toute la famille épuisée",
        "note_fr": "Texte réécrit pour l'application, sur le thème étudié en classe, avec le vocabulaire de l'article du cours.",
        "body": """
每年 六月 ， 中国 好像 进入=entrer dans 了 “ 紧急状态=état d'urgence ” 。 两 天 的 高考=gaokao (concours d'entrée à l'université) ， 对 近 一千万 年轻人 来说 ， 是 一生 中 最 重要 的 日子 ， 因为 考试 的 分数=note, score 决定=décider 他们 的 未来=avenir 。

为了 这 两 天 ， 学生们 努力=faire des efforts 学习 了 很多 年 。 他们 牺牲=sacrifier 了 童年=enfance 、 周末 和 假期 ， 还 要 忍受=supporter, endurer 睡眠不足=manque de sommeil 。 到 了 高三=terminale (3e année de lycée) ， 这个 问题 变得=devenir 更 严重=grave ： 很多 学生 从 早上 六 点 一直=sans arrêt 学习 到 半夜 ， 非常 辛苦=pénible, dur 。

全家人 也 跟着 受累=se fatiguer pour quelqu'un 。 父母 给 孩子 喝 鸡汤=bouillon de poulet ， 吃 药丸=pilule 和 滋补品=fortifiant 。 考试 的 时候 ， 警察=police 封锁=bloquer 考场=salle d'examen 周围=autour 的 街道 ， 为 考生=candidat 创造=créer 安静=calme 的 环境=environnement 。 整个 国家 都 很 兴奋=excité 。

父母 常常 告诉 孩子 ： 多 考 几 分 ， 就 意味着=signifier, impliquer 更 好 的 大学 、 更 好 的 工作 、 更 大 的 房子 ， 甚至=même 更 好 的 结婚 对象=partenaire 。 可是 ， 对 很多 学生 来说 ， 这样 的 学习 就 像 一 场 噩梦=cauchemar 。 考完 以后 ， 有些 学生 把 课本 撕成=déchirer en 碎片=morceaux 来 减压=évacuer le stress 。 后来 ， 有的 地方 禁止=interdire 了 这 种 做法 ， 要求 学校 给 学生 提供=offrir, fournir 心理辅导=soutien psychologique 。
""",
        "quiz": [
            {"q": "Combien de jeunes passent le gaokao chaque année ?", "a": "Près de 10 millions", "wrong": ["Près d'un million", "Près de 100 000", "Près de 100 millions"]},
            {"q": "Que sacrifient les élèves ?", "a": "Leur enfance, leurs week-ends et leurs vacances", "wrong": ["Leur argent de poche", "Leurs études universitaires", "Leur travail"]},
            {"q": "Que font les policiers pendant l'examen ?", "a": "Ils bloquent les rues autour des salles d'examen", "wrong": ["Ils surveillent les copies", "Ils accompagnent les parents", "Ils distribuent les sujets"]},
            {"q": "Que signifient « quelques points de plus » pour les parents ?", "a": "Une meilleure université, un meilleur travail, une vie meilleure", "wrong": ["Des vacances plus longues", "Moins de pression", "Un voyage à l'étranger"]},
        ],
    },
    {
        "id": "buxiban",
        "title": "补习班：好 成绩 是 唯一 的 标准 吗？",
        "title_fr": "Les cours de soutien : les notes sont-elles le seul critère ?",
        "note_fr": "Texte réécrit pour l'application, sur le thème étudié en classe, avec le vocabulaire de l'article du cours.",
        "body": """
2021 年 ， 为了 减轻=alléger 学生 的 负担=charge, fardeau ， 中国 禁止 了 很多 课外 补习班=cours de soutien privé ， 许多 教育 机构=organisme, structure 都 倒闭=faire faillite 了 。

可是 ， 家长们 非常 焦虑=angoissé 。 他们 认为 ， 要 考上 好 大学 ， 成绩=résultats scolaires 必须 优异=excellent ， 所以 花 再 多 钱 也 愿意 。 有 需求=demande, besoin ， 就 有 市场=marché 。 于是 ， 出现=apparaître 了 新 的 补课 方式 ， 比如 直播=en direct 教师 ， 很 受 家长 欢迎=être apprécié 。

实际上=en réalité ， 真正 能 帮助 学生 的 人 是 他们 自己 。 在 传统=tradition, traditionnel 的 教育 观念=mentalité 里 ， 分数 好 就是 好 学生 。 但是 ， 成绩 并 不是 成功 的 唯一=unique 标准=critère 。 有些 学生 成绩 不 理想 ， 却 可以 靠 自己 的 技能=compétence 获得 成功 。

所以 ， 家长 不 应该 强迫=forcer 孩子 学习 ， 也 不 能 只 看 分数 而 忽视=négliger 孩子 的 身体 健康 。 只有 对 学习 感兴趣 ， 学生 才 会 真正 努力 。
""",
        "quiz": [
            {"q": "Que s'est-il passé en 2021 ?", "a": "La Chine a interdit de nombreux cours de soutien", "wrong": ["Le gaokao a été supprimé", "Les écoles ont fermé", "Les cours sont devenus gratuits"]},
            {"q": "Comment ont réagi les parents ?", "a": "Ils étaient très angoissés", "wrong": ["Ils étaient soulagés", "Ils ont manifesté", "Ils n'ont rien remarqué"]},
            {"q": "Selon le texte, qui peut vraiment aider les élèves ?", "a": "Eux-mêmes", "wrong": ["Les professeurs en direct", "Le gouvernement", "Les organismes privés"]},
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
        "id": "gaokao-colle",
        "from_text": "gaokao",
        "title": "高考：一个 人 考试，全家 一起 累",
        "title_fr": "Le gaokao (texte de ta colle)",
        "questions": [
            {"zh": "你 觉得 高考 公平 吗 ？ 为什么 ？", "fr": "Trouves-tu le gaokao équitable ? Pourquoi ?"},
            {"zh": "高考 给 学生 带来 了 什么 影响 ？", "fr": "Quelles conséquences le gaokao a-t-il sur les élèves ?"},
            {"zh": "和 法国 的 高中 会考 相比 ， 高考 有 什么 不同 ？", "fr": "Par rapport au baccalauréat français, en quoi le gaokao est-il différent ?"},
        ],
    },
    {
        "id": "aipeiban",
        "title": "人工智能 陪伴 ： 机器 能 代替 朋友 吗 ？",
        "title_fr": "Compagnons IA : une machine peut-elle remplacer un ami ?",
        "body": """
在 中国 ， 越来越多 的 年轻人 开始 和 人工智能 聊天 。 有的 人 买 会 说话 的 机器 宠物=animal de compagnie ， 有的 人 用 手机 上 的 “ 虚拟=virtuel 朋友 ” 。 他们 说 ， 机器 不 会 批评 自己 ， 随时=à tout moment 都 能 陪伴 自己 。

专家 指出 ， 这 和 独生子女=enfant unique 政策 有 关系 。 很多 年轻人 没有 兄弟姐妹 ， 工作 压力 又 大 ， 很 难 交=se faire (des amis) 朋友 ， 所以 感到 孤独 。

不过 ， 也 有 人 担心 ， 孩子 太 依赖=dépendre de 人工智能 ， 会 失去 独立=indépendant 思考 的 能力 ， 也 不 会 和 真人 交流=communiquer 。 还有 家长 担心 孩子 的 隐私=vie privée 。 人工智能 到底 是 好 朋友 ， 还是 新 的 问题 ？
""",
        "questions": [
            {"zh": "你 在 生活 中 怎么 使用 人工智能 ？", "fr": "Comment utilises-tu l'intelligence artificielle dans ta vie ?"},
            {"zh": "机器 能 代替 真 朋友 吗 ？ 为什么 ？", "fr": "Une machine peut-elle remplacer un vrai ami ? Pourquoi ?"},
            {"zh": "独生子女 政策 对 中国 社会 有 什么 影响 ？", "fr": "Quel impact la politique de l'enfant unique a-t-elle sur la société chinoise ?"},
        ],
    },
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
    ("synthese", "这 篇 文章 说 的 是 高考 给 中国人 带来 的 影响 。", "Cet article parle des conséquences du gaokao pour les Chinois."),
    ("synthese", "这 给 学生 带来 了 很 大 的 压力 。", "Cela impose une forte pression aux élèves."),
    ("synthese", "这 使 学生 失去 了 自己 的 时间 。", "Cela fait perdre aux élèves leur temps libre."),
    ("synthese", "各个 大学 根据 分数 录取 考生 。", "Chaque université recrute les candidats selon leurs notes."),
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
    ("影响", "", "influence ; influencer"),
    ("录取", "", "admettre, recruter (une université)"),
    ("根据", "", "selon, d'après"),
    ("然而", "", "cependant"),
    ("使", "", "rendre, faire que"),
    ("另外", "", "en outre, par ailleurs"),
    ("办法", "", "solution, moyen"),
    ("机会", "", "occasion, opportunité"),
    ("请家教", "qǐng jiājiào", "prendre des cours particuliers"),
    ("报补习班", "bào bǔxíbān", "s'inscrire à des cours de soutien"),
    ("望子成龙", "", "espérer que son fils réussisse brillamment"),
    ("望女成凤", "", "espérer que sa fille réussisse brillamment"),
    ("虎爸虎妈", "", "parents très exigeants (« parents tigres »)"),
    ("重点中学", "", "lycée d'élite"),
    ("上课外班", "", "suivre des cours supplémentaires"),
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


# ---------------------------------------------------------------------------
# Words that deserve extra pronunciation work: (word, note, example sentence)
# ---------------------------------------------------------------------------
DRILLS = [
    ("全", "tout, entier (attention : pas « kuan »)", "全 家 人 都 很 累 。"),
    ("消息", "nouvelle, information", "这 是 一 个 好 消息 。"),
    ("进入", "entrer dans", "中国 进入 了 紧急状态 。"),
    ("轻", "léger", "我 想 减轻 学生 的 负担 。"),
    ("重", "lourd, important", "高考 非常 重要 。"),
    ("场", "classificateur (examen, match)", "这 是 一 场 重要 的 考试 。"),
    ("将", "va, sera (écrit)", "这 场 考试 将 决定 学生 的 未来 。"),
    ("这", "ce, cette", "这 个 问题 很 难 。"),
    ("一直", "sans arrêt, tout le temps", "她 一直 在 学习 。"),
    ("努力", "faire des efforts", "学生们 努力 学习 。"),
    ("学习", "étudier", "学习 是 一 件 快乐 的 事情 。"),
    ("童年", "enfance", "他们 牺牲 了 童年 。"),
    ("夜", "nuit", "很多 学生 学习 到 半夜 。"),
    ("问题", "problème, question", "这个 问题 变得 更 严重 了 。"),
    ("变得", "devenir", "生活 变得 更 难 了 。"),
    ("更", "encore plus", "多 考 几 分 ， 就 有 更 好 的 大学 。"),
    ("严重", "grave", "这个 问题 很 严重 。"),
    ("地", "de : après un adverbe", "他们 辛苦 地 学习 。"),
]

# ---------------------------------------------------------------------------
# Usage traps: (sentence with ＿, right answer, wrong answers, explanation)
# ---------------------------------------------------------------------------
USAGE = [
    ("我 有 ＿ 个 姐姐 。", "两", ["二"], "Pour une quantité : 两. Pour un numéro ou une date : 二."),
    ("高考 考 ＿ 天 。", "两", ["二"], "Une durée se compte avec 两."),
    ("今天 是 十月 ＿ 号 。", "二", ["两"], "Une date s'écrit avec 二."),
    ("他 的 房间 是 ＿ 零 五 号 。", "二", ["两"], "Un numéro se lit avec 二."),
    ("很多 家长 给 孩子 ＿ 补习班 。", "报", ["做"], "On dit 报补习班 (s'inscrire), jamais 做补习班."),
    ("有钱 的 家庭 常常 ＿ 家教 。", "请", ["做", "报"], "请家教 : prendre un professeur particulier."),
    ("父母 ＿ 孩子 喝 鸡汤 。", "给", ["跟", "在"], "给 gěi : donner, pour quelqu'un."),
    ("好 大学 意味着 ＿ 多 的 机会 。", "更", ["很"], "更 gèng : encore plus (comparaison)."),
    ("减轻 压力 的 ＿ 有 很多 。", "办法", ["机会"], "办法 bànfǎ : solution. 机会 jīhuì : occasion."),
    ("老师 说 ： 你 要 ＿ ！", "努力学习", ["学习努力"], "努力学习 : conseil, ordre (« travaille bien »)."),
    ("他 ＿ ， 每天 都 看书 。", "学习努力", ["努力学习"], "学习努力 : constat (« il est travailleur »)."),
    ("学生们 辛苦 ＿ 学习 。", "地", ["的", "得"], "Devant un verbe : 地 (de)."),
    ("高考 ＿ 学生 带来 了 很 大 的 压力 。", "给", ["对"], "给…带来 : apporter à quelqu'un."),
    ("高考 ＿ 中国人 的 影响 很 大 。", "对", ["给"], "对…的影响 : l'influence sur quelque chose."),
    ("高考 ＿ 学生 失去 了 自己 的 时间 。", "使", ["首先"], "使 : rendre, faire que. 首先 : tout d'abord."),
    ("高考 很 公平 。 ＿ ， 它 也 给 学生 很 大 的 压力 。", "然而", ["首先"], "然而 oppose deux idées. 首先 ouvre une énumération."),
    ("分数 决定 未来 。 ＿ ， 学生们 都 很 努力 。", "因此", ["然而"], "因此 : par conséquent."),
    ("下课 以后 ， 除了 做 作业 ＿ 是 上 补习班 。", "就", ["才"], "除了…就 : à part…, il ne reste que…"),
    ("早上 八 点 上课 ， 下午 四 点 ＿ 放学 。", "才", ["就"], "才 : seulement (plus tard que prévu)."),
    ("＿ 不 努力 ， 就 考不上 好 大学 。", "要是", ["虽然"], "要是…就 : si… alors (oral)."),
]

# ---------------------------------------------------------------------------
# Written practice, in the format of the BCE and Ecricome papers
# ---------------------------------------------------------------------------
WRITING = [
    {"id": "res1", "kind": "resume", "target": 250, "docs": ["gaokao", "buxiban"],
     "q": "这 两 篇 文章 中 ， 学生 的 压力 来自 哪里 ？ 家长 有 什么 不同 的 做法 ？",
     "fr": "D'où vient la pression des élèves dans ces deux textes ? Quels comportements des parents sont décrits ?"},
    {"id": "res2", "kind": "resume", "target": 250, "docs": ["neijuan", "aipeiban"],
     "q": "这 两 篇 文章 中 的 年轻人 有 哪些 问题 ？ 他们 分别 怎么 面对 ？",
     "fr": "Quels problèmes ont les jeunes de ces deux textes ? Comment y font-ils face ?"},
    {"id": "ess1", "kind": "essai", "target": 350,
     "q": "你 认为 使用 人工智能 会 让 学生 不 再 独立 思考 吗 ？ 请 举例 说明 。",
     "fr": "Penses-tu que l'IA empêche les élèves de penser par eux-mêmes ? Donne des exemples."},
    {"id": "ess2", "kind": "essai", "target": 350,
     "q": "成绩 是 成功 的 唯一 标准 吗 ？ 请 举例 说明 。",
     "fr": "Les notes sont-elles le seul critère de réussite ? Donne des exemples."},
    {"id": "ess3", "kind": "essai", "target": 350,
     "q": "你 认为 高考 公平 吗 ？ 请 和 法国 比较 。",
     "fr": "Le gaokao te semble-t-il équitable ? Compare avec la France."},
    {"id": "th1", "kind": "theme",
     "src": "En Chine, beaucoup de parents inscrivent leurs enfants à des cours de soutien, car ils ont peur qu'ils prennent du retard. Pourtant, les notes ne sont pas le seul critère de réussite.",
     "model": "在 中国 ， 很多 家长 给 孩子 报 补习班 ， 因为 他们 怕 孩子 落后 。 然而 ， 成绩 并 不是 成功 的 唯一 标准 。"},
    {"id": "th2", "kind": "theme",
     "src": "Pendant les deux jours du gaokao, la police bloque les rues autour des salles d'examen afin de créer un environnement calme pour les candidats.",
     "model": "高考 的 两 天 里 ， 警察 封锁 考场 周围 的 街道 ， 为 考生 创造 安静 的 环境 。"},
    {"id": "th3", "kind": "theme",
     "src": "Les jeunes d'aujourd'hui ont peu de temps pour leurs amis, car la concurrence au travail est forte. C'est pourquoi certains cherchent de la compagnie auprès de l'intelligence artificielle.",
     "model": "现在 的 年轻人 陪 朋友 的 时间 很 少 ， 因为 工作 竞争 很 激烈 。 因此 ， 有些 人 开始 用 人工智能 陪伴 自己 。"},
    {"id": "ve1", "kind": "version",
     "zh": "很多 大学生 毕业 以后 找不到 满意 的 工作 。 有些 人 回到 父母 家 ， 帮 父母 做饭 、 打扫 ， 父母 每 个 月 给 他们 工资 。",
     "model": "Beaucoup d'étudiants ne trouvent pas d'emploi satisfaisant après leur diplôme. Certains retournent chez leurs parents, font la cuisine et le ménage, et reçoivent chaque mois un salaire de leur part."},
    {"id": "ve2", "kind": "version",
     "zh": "十一月 十一 日 是 中国 最 大 的 购物节 。 这 一 天 ， 消费者 在 网上 买 很多 东西 ， 因为 价格 比较 便宜 。 不过 ， 有些 人 买 了 以后 才 发现 自己 并 不 需要 。",
     "model": "Le 11 novembre est la plus grande fête du shopping en Chine. Ce jour-là, les consommateurs achètent beaucoup en ligne, car les prix sont plutôt bas. Pourtant, certains se rendent compte après coup qu'ils n'en avaient pas besoin."},
]
