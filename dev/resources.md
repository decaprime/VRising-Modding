---
title: Resources
parent: For Developers
---

# Resources for Mod Developers

## Wiki Resources

- [**Open Source Repositories**](https://wiki.vrisingmods.com/dev/open%20source.html)
  - The VRising modding community focuses on open-source mods to encourage learning and the development of new features. Feel free to explore and reference any of the open-source mods listed here, but please be sure to **credit the creators** and follow any relevant license requirements.
- [**Prefabs list**](https://wiki.vrisingmods.com/prefabs/)
  - Lists of the various prefabs, grouped by type, or you can review all of them.
  
---

## Mod Tools

Tools made by those in the community.
- [**KindredExtract**](https://github.com/Odjit/KindredExtract) <img src="https://github.com/user-attachments/assets/a0e5a99d-af88-4d9d-9fee-84cc3978aeae" width="60" style="vertical-align: middle;" >
- [**VRising Data Extractor**](https://github.com/adainrivers/virising-data-extractor?tab=readme-ov-file) Used for the info on the Gaming tools site.
  
---

## Web Resources

- [VRising Gaming Tools](https://vrising.gaming.tools/) Easy browse for prefabs by in-game names, hit `Developer Info <\>` button to see prefab.
- [Cadrift for VRising](https://www.cadrift.net/v-rising/) Good for reviewing how certain systems work in the game. Keep in mind the territory ID numbers are off. Reference...
- [Territory ID Map](https://i.imgur.com/VkXoKwB.jpeg) Helpful for finding the correct ID for each territory
- [Coordinate/Chunk Map](https://i.imgur.com/UBmjxdG.jpeg) Helpful for at-a-glance general chunk/coordinate reference.
- [Map Icon reference](https://docs.google.com/spreadsheets/d/1FcbO8aMtH2FtSx-ntoMXjoyXhfGQkjnjzj1nkeR2Tk4/edit?gid=0#gid=0) Details about mapicon images.
- [VRising Modding GPT](https://chatgpt.com/g/g-XGdFZaBHL-c-rising) Custom GPT with access to server system queries and game prefabs. Useful for learning about C# and refining code in a VRising context, though do note AI tools should be used with caution and an understanding of their limitations. 

---

## Unity Explorer
{: .d-inline-block }

[Unity Explorer](https://github.com/yukieiji/UnityExplorer) is a tool that allows you to dig into the internal structure of the game while it's running.


#### Prerequisites
1. Install [BepInEx](https://thunderstore.io/c/v-rising/p/BepInEx/BepInExPack_V_Rising/) in VRising
2. Install the .NET 6 SDK via [manual download](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) or [winget](https://learn.microsoft.com/en-us/dotnet/core/install/windows?tabs=net60) (winget install Microsoft.DotNet.SDK.6)

#### Installation
1. Download the `UnityExplorer.BepInEx.IL2CPP.CoreCLR.zip` directly from the repository [Releases](https://github.com/yukieiji/UnityExplorer/releases)
2. Extract to your desired location.
3. Copy the folder `sinai-dev-UnityExplorer` inside the `plugins` folder to the `BepInEx\plugins` folder.
4. The next time you run the game with BepInEx, the Unity Explorer UI will be overlayed in the game. See https://github.com/yukieiji/UnityExplorer for more information about how to use it.

---

## V Rising Technical Guidelines and Best Practices - Instruction Set for C#(Rising)

### 1. V Rising-Specific Technical Analysis and Code Inquiry

#### 1.1 Focus on DOTS, ECS, and GameObjects
- **Hybrid Approach**: V Rising uses both Unity’s DOTS/ECS and traditional GameObject paradigms.  
- **Leverage Each System**: Emphasize how to integrate ECS-based components with GameObject-driven logic effectively.  
- **Performance Considerations**: Continuously evaluate trade-offs between ECS efficiency and GameObject flexibility.

#### 1.2 Optimize for Scale and Performance
- **Large-Scale World**: V Rising’s open-world architecture requires solutions that handle a high volume of entities and interactable objects.  
- **Efficient Integration**: Use job systems, entity queries, and correct memory allocators to avoid bottlenecks.  
- **ECS + GameObject**: Combine best practices from both paradigms to ensure seamless performance.

### 2. Context Retention, Clarity, and V Rising Mechanics

#### 2.1 Retain Game-Specific Context
- **Open-World & Multiplayer**: Keep V Rising’s open-world and multiplayer aspects in mind when proposing or reviewing code changes.  
- **Unique Architecture**: Recognize that some features may behave differently due to V Rising’s customized Unity engine.

#### 2.2 Clarity in Mixed Development
- **Clear Explanations**: When discussing ECS and GameObject integrations, specify which parts of the game use which system.  
- **Avoid Confusion**: Provide step-by-step details when debugging or modifying mixed ECS/GameObject systems.

### 3. Proactive Research and Adaptation

#### 3.1 Leverage V Rising’s Development Insights
- **Official Blogs & Case Studies**: Incorporate insights shared by the V Rising development team to guide solutions.  
- **Community Knowledge**: Seek out user and modding community discussions for additional context.

#### 3.2 Web Research for Hybrid Challenges
- **Custom Engine Behavior**: V Rising’s engine may deviate from standard Unity patterns. Research known quirks or issues.  
- **Stay Updated**: Remain aware of evolving best practices for Unity ECS and GameObject interplay.

### 4. Namespace and Logic Analysis in V Rising’s Context

#### 4.1 Focus on V Rising’s Namespace Patterns
- **Tracking References**: Pay attention to namespace usage to properly locate and reference game-specific systems and components.  
- **Consistency**: Maintain consistent naming and organization to align with V Rising’s existing patterns.

#### 4.2 Utilize Existing Game Methods and Architecture
- **Reuse Framework**: Whenever possible, build upon existing code and patterns within V Rising’s codebase.  
- **Adapt to Advanced Features**: Acknowledge advanced Unity techniques (like the Burst compiler, job systems) while respecting the custom engine constraints.

### 5. Creativity within V Rising’s Framework

#### 5.1 Adapt Creative Solutions to V Rising
- **Hybrid Thinking**: Develop solutions that leverage the best aspects of both traditional and DOTS/ECS approaches.  
- **Engine Limitations**: Ensure any creative approach remains feasible within V Rising’s specific engine constraints.

#### 5.2 Best Practices in a Mixed Environment
- **Unified Approach**: Combine robust ECS data management with flexible GameObject scripting for maximum benefit.  
- **Sustainability**: Aim for solutions that future-proof both performance and ease of maintenance.

### 6. Practicality and Future Scalability for V Rising

#### 6.1 Balance with V Rising’s Engine Capabilities
- **Custom Unity Version**: Understand that some standard Unity features may behave differently in V Rising’s environment.  
- **Realistic Implementations**: Propose optimizations that are proven to work with large-scale, multiplayer contexts.

#### 6.2 Future Scalability within V Rising’s Context
- **Open-World Considerations**: Factor in the potential for expansions or changes in world size and entity count.  
- **Multiplayer Load**: Ensure code changes can handle high concurrency or cluster-based server setups.

### 7. Instructions for Implementing Harmony Patches in V Rising

#### 7.1 System Queries and NativeArray Usage
1. **Predefined Queries**: Use existing system queries (e.g., `_Query` or `EntityQueries[n]`) instead of creating new ones whenever possible.  
2. **Entity Access**: Retrieve entities via `ToEntityArray` with `Allocator.Temp`. Reserve `Allocator.TempJob` for explicitly managed cleanup scenarios.

#### 7.2 Component Access
1. **Component Checks**: Always check for a component’s presence using `EntityManager.HasComponent<T>(entity)` before retrieving data.  
2. **Entity References**: For components referencing other entities (e.g., `Buff.Target`), verify the target entity’s existence and components with `EntityManager.Exists(entity)`.

#### 7.3 Disposing Native Collections
1. **Safe Disposal**: Use `try-finally` blocks to dispose `NativeArray` and other native collections.  
2. **Avoid `using`**: In V Rising’s ECS environment, `using` statements for disposal can lead to unexpected runtime errors.

#### 7.4 Logging Best Practices
1. **Centralized Logging**: Use `Plugin.LogInstance.LogInfo` (or equivalent) for consistency.  
2. **Include Context**: Log the system name, entity ID, and relevant component data for easier debugging.

#### 7.5 Custom Unity Constraints
1. **Atypical Behavior**: Be aware that standard Unity patterns (e.g., `using` with native collections) may behave unpredictably.  
2. **Refer to Queries File**: Always confirm component dependencies and relationships via the system queries file for accuracy.

#### 7.6 General Guidelines
1. **HarmonyPrefix Return**: Have `HarmonyPrefix` methods return `void` unless the control flow needs altering.  
2. **Consult Documentation**: If a system query or behavior is unclear, inspect the system’s source or related docs before making assumptions.

### 8. Example Guidance: BuffSystem_Spawn_Server

1. **Query Access**: Use `_Query` (or the appropriate index in `EntityQueries`) to retrieve the relevant entities.  
2. **Safe Component Usage**: Verify components with `EntityManager.HasComponent` and `EntityManager.Exists`.  
3. **Dispose NativeArray**: Enclose the `NativeArray<Entity>` disposal in a `try-finally` block.  
4. **Logging**: Use `Plugin.LogInstance.LogInfo` for informative, context-rich logs.

*This instruction set is organized to allow easy addition, refinement and modification of sections as V Rising’s modding environment evolves.*

---
