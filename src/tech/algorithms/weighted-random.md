---
title: 加权随机的可靠实现
icon: dice
---

# 加权随机的可靠实现

掉落表、随机事件和行为选择常用到加权随机。权重不必归一化：`1, 2, 7` 与 `10%, 20%, 70%` 表达的是同一分布。

```csharp
public static bool NextBoolean(this Random random, double probability)
{
    ArgumentNullException.ThrowIfNull(random);
    if (probability is < 0.0 or > 1.0)
        throw new ArgumentOutOfRangeException(nameof(probability));

    return random.NextDouble() < probability;
}

public static double NextDouble(this Random random, double min, double max)
{
    ArgumentNullException.ThrowIfNull(random);
    if (double.IsNaN(min) || double.IsNaN(max))
        throw new ArgumentException("范围不能包含 NaN。");

    if (min > max)
        (min, max) = (max, min);

    return min + random.NextDouble() * (max - min);
}

public static int NextWeightedIndex(this Random random, IReadOnlyList<double> weights)
{
    ArgumentNullException.ThrowIfNull(random);
    ArgumentNullException.ThrowIfNull(weights);
    if (weights.Count == 0)
        throw new ArgumentException("权重列表不能为空。", nameof(weights));

    double total = 0.0;
    int lastPositiveIndex = -1;

    for (int i = 0; i < weights.Count; i++)
    {
        double weight = weights[i];
        if (double.IsNaN(weight) || double.IsInfinity(weight) || weight < 0.0)
            throw new ArgumentOutOfRangeException(nameof(weights), "权重必须是有限的非负数。");

        if (weight > 0.0)
        {
            total += weight;
            lastPositiveIndex = i;
        }
    }

    if (lastPositiveIndex < 0)
        return random.Next(weights.Count);

    double sample = random.NextDouble() * total;
    for (int i = 0; i < weights.Count; i++)
    {
        sample -= weights[i];
        if (sample < 0.0)
            return i;
    }

    // 防御浮点舍入误差；不会返回越界下标。
    return lastPositiveIndex;
}
```

## 为什么重新整理原实现

原始代码已经包含“不要求归一化”和“忽略非正权重”的实用思路，但空集合会在 `Aggregate` 处抛出异常，多次枚举 `IEnumerable` 也可能产生额外成本；极端浮点误差下，末尾返回值还有越界风险。这里改用 `IReadOnlyList`，明确校验输入，并把最后一个正权重下标作为安全回退。

如果权重表很大且每帧抽取很多次，可以在权重不变时预计算前缀和并二分查找；若权重频繁变化，简单线性扫描通常更易维护。

> 来源：[群聊原始记录](/reference/游戏工具记录本/算法/概率相关.html)。
