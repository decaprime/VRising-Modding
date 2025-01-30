---
title: Development Environment Setup
parent: For Developers
---

# Development Environment Setup

Before starting development, you'll need to install and configure a few essential tools like an IDE, Git, and .NET to set up your development environment.

## Integrated Development Environment: Visual Studio

### Visual Studio Installation

1. **Download and Install Visual Studio 2022**  
   Go to the official [Visual Studio 2022 download page](https://visualstudio.microsoft.com/). Choose the **Community** edition (which is free) and download the installer.

2. **Workloads Tab: Select Unity Game Development**  
   During installation, under the **Workloads** tab, choose the **Game development with Unity** workload. This includes the necessary tools to work with Unity-based mods. 

3. **Individual Components Tab: .NET 6.0 Runtime and .NET SDK**  
   Select **.NET 6.0 Runtime (Long-Term Support)** and **.NET SDK** (scroll down for the latter). Our BepInEx uses 6.0, but you will need the SDK as well. Alternatively, you can download from [Microsoft's dotnet site](https://dotnet.microsoft.com/en-us/download/dotnet/6.0).

4. **Finish Installation**  
   Complete the installation process and launch Visual Studio. If you missed installing the workload or the individual component, you can always reopen the installer and choose **Modify** to add these after. You can customize the editor further if you want, but the default setup with Unity support should be enough for mod development.

5. **Tutorial Video (Optional)**  
   To get familiar with Visual Studio, it’s recommended to watch a few [tutorial videos](https://www.youtube.com/watch?v=VcU2HGsxeII). You can find official Visual Studio tutorials or Unity-specific tutorials that explain how to use the IDE for modding.
   
### Additional Resources

- **IDE Options**: Some developers prefer using [Rider](https://www.jetbrains.com/rider/), an IDE from JetBrains, for Unity development. Rider has integrated support for Unity and C# and includes powerful features such as built-in debugging tools and a decompiler (dnSpy). If you’re comfortable with it, you can use Rider as an alternative to Visual Studio.

- **Decompilers**: It can be helpful to have a decompiler such as [dnSpy](https://dnspy.org/), [dotPeek](https://www.jetbrains.com/decompiler/), or [ILSpy](https://github.com/icsharpcode/ILSpy#ilspy-------). You can use these to inspect the files in `VRisingDedicatedServer\BepInEx\interop`.

- **dnSpy Plugin**: [dnspy.Cpp2IL](https://github.com/BadRyuner/dnspy.Cpp2IL) is an extension for dnSpy that enables users to view IL2CPP-compiled Unity games directly within the dnSpy interface.

- **Cpp2IL**: [Cpp2IL](https://github.com/SamboyCoding/Cpp2IL) is a tool designed to reverse Unity's IL2CPP (Intermediate Language to C++) build process back to the original managed DLLs. It aims to reconstruct game assemblies from IL2CPP-compiled games, making them readable by tools like dnSpy.

- **Il2CppDumper** [Il2CppDumper](https://github.com/Perfare/Il2CppDumper) is a tool designed to help reverse engineer Unity games compiled with IL2CPP, allowing users to extract and analyze game assemblies.

***Note: What is the difference between Cpp2IL vs Il2CppDumper***?
- Il2CppDumper: *Primarily focuses on extracting metadata and generating dummy DLLs from IL2CPP-compiled games.*
- Cpp2IL: *Aims to reverse the IL2CPP build process back to the original managed DLLs, providing more comprehensive code reconstruction.*

--- 

## Git
Git is a tool that helps you keep track of changes to your code. It makes it easy to collaborate with others and go back to previous versions of your project. Using GitHub, you can show your code online. There are two main ways to use Git: **Graphical User Interfaces (GUIs)** or the **command line**.
- **Install Git**:  
  Download Git from the official [Git website](https://git-scm.com/downloads). Follow the installation steps from the [official guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
### Create a GitHub Account

To store and share your code, create a **GitHub** account at [GitHub’s sign-up page](https://github.com/join). After signing up, you can create repositories to store and share your code.


### **Using a GUI (Beginner-Friendly)**

If you're new to Git or prefer a visual interface, you can use a **GUI** to make things easier.

- **[GitHub Desktop](https://desktop.github.com/)**: This is the simple option. It provides basic Git functionalities like cloning repositories, making commits, pushing/pulling changes, and switching branches, all in a straightforward, beginner-friendly interface.
- **[TortoiseGit](https://tortoisegit.org/)**: A Git client that integrates with **Windows Explorer**. It provides a simple graphical interface directly within the file system, allowing you to manage repositories and commits without leaving the file explorer. Suitable for both beginners and intermediate users.  
- **[Git Extensions](https://gitextensions.github.io/)**: If you want a more powerful tool with advanced features like a visual commit history, you can try Git Extensions. This is a bit more complex than GitHub Desktop, but it's still beginner-friendly.

### **Using the Git Command Line (More Control)**

For more advanced users or if you want full control over Git, you can install Git and use it through the **command line**. This gives you access to all Git features, but it can be more complicated for beginners. [Follow Setup Instructions](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)


---

## Templates
A Command Prompt or PowerShell window should be opened in the folder where you want your mods to be created. Follow template install instructions from the [Template Page](https://wiki.vrisingmods.com/dev/template.html).

