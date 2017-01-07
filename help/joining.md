---
layout: default
title: "Joining to FUMBBLPlus with Your Project"
---

# Joining to FUMBBLPlus with Your Project

FUMBBLPlus is a static [Github Pages] site and [Github Pages] are generated using [Jekyll] by default.
Knowing what [Github Pages] is is essential for joining.


## Fork [FUMBBLPlus][FUMBBLPlus Repository]

You should fork the [FUMBBLPlus Repository] to your own account first.
This is done by going to th [FUMBBLPlus Repository] page and clicking on the `Fork` button in the top right.
You should have your own fork of FUMBBLPlus within moments.

## Clone Your Fork Locally

Now you have to clone your fork locally.
Click on the `Clone or Download` on your fork's page then click on `Use HTTPS` and copy the URL provided.
It should be like `https://github.com/<your_user_name>/fumbblplus.github.io.git`.

Both the original and the forked pages are [Git] repositories, so you have to have [Git installed][Installing Git] to deal with them.
On Linux and OSX, open a Terminal.
On Windows, the [Git] installation usually comes with a separate command line which you should start.

```
cd <my_prefered_main_directory>
git clone --recursive -j8 https://github.com/<your_user_name>/fumbblplus.github.io.git
cd fumbblplus.github.io
```

This command will clone the forked [FUMBBLPlus Repository]&#8203; [with all of its submodules][How to git clone with submodules].
From this time on we assume to be in the `fumbblplus.github.io` directory.

Now you should follow the instructions of [THIS PAGE][Setting up your GitHub Pages site locally with Jekyll] but skip Step 1 and Step 3 and your Step 4 command should be:

```
bundle exec jekyll serve -w --safe
```

As the page sais, you should be able to view the local FUMBBLPlus site in your web browser at `http://localhost:4000`.
Once you tested it working, then hit `Ctrl+C` in the terminal.


## Add your own Project to the local [FUMBBLPlus][FUMBBLPlus Repository]

In FUMBBLPlus, **Projects are plugin-like addons**.
Technicaly, they are [Git Submodules].
[SR Rankings][SR Rankings Repository] Project is a good example.
All of it's code is in a separate [repository][SR Rankings Repository] which is then added as a [submodule][Git Submodules] to the [FUMBBLPlus Repository].
If you check the [FUMBBLPlus Repository] you can notice that the `sr` folder icon will have a little indicator showing that it is a submodule.
Clicking on the `sr` folder will take you over to the [SR Rankings Repository].

So the first thing you need for your Project is an empty [GitHub] repository.
Once it is done, you should add it as a submodule to the local fork.
Replace the HTTPS link below with yours.

```
git submodule add -b master https://github.com/your_username_or_organization/your_repo_name
```

This command clones your repository to the `your_repo_name` directory.
Since it is an empty repository, the directory will be empty (aside from the hidden `.git` subdirectory).

If you want to see your Project in the FUMBBLPlus menu, edit the `_config.yml` file like this:

```YAML
...
  - title: "SR"
    url: "/sr"
  - title: "MyProject"
    url: "/your_repo_name"
...
```

## Add index.md (and sublinks.json) to your Project

Your Project must have a main page, so you have to add an `index.md` file to the `your_repo_name` directory.

The following content should do for now:

```markdown
---
layout: default
title: "My Great Project"
---

# Welcome to My Great Project!
```

If you added your Project to the FUMBBLPlus menu, it is also assumed to have a `sublinks.json` file which contains the submenu items to show up when the mouse walks over the main menu item.

The [SR Project][SR Rankings Repository] provides a good example of this file.
But for now, a `sublinks.json` with the following content should be enough:

```JSON
[]
```

This defines no sublinks.


## Watch your Project

Now you should build the local FUMBBLPlus site with [Jekyll] again:

```
bundle exec jekyll serve -w --safe
```

By going to `http://localhost:4000` with your web browser you should see your new menu item there.
By clicking on it, you should see the welcome message.


## Adding More Content

The `index.md` you added to your Project is in [Markdown] format.
[Markdown] is an easy-to-read, easy-to-write plain text format which is then converted to HTML by [Jekyll].
I recommend you to read the [Markdown Basics] and keep the [Markdown Cheatsheet] close while you edit [Markdown] files.
Again, you can peek into [SR Project][SR Rankings Repository] for working examples.

Each time you save `index.md`, the local site at `http://localhost:4000` should get refreshed within some seconds.

You can also add HTML files to your Project but with a little modification:

```markdown
---
layout: none
title: "My Page Title"
---
<head>
  {{ "{% include head_common.html " }}%}
  {{ "{% include head_css.html " }}%}
<!-- My head content -->
</head>
<body>
<!-- My body content -->
</body>
```

## Push Your Content to your Fork

You can optionally observe changes with the following commands:

```
git status
git diff
```

Refreshing your fork's remote data is is done by a standard git push:

```
git add -A
git commit -m "my wonderful new content added"
git push origin master
```

I recommend you to do this not once all is up but regularly during development.
Pushing to a version controlled system is more than saving.
You can get back to any previous state at anytime.

## Push Your Content to the FUMBBLPlus website

Once your Project seems nice and working, go to your fork's page and click on `Pull requests`.
Then create a new pull request with a small text what it is all about.

The [Head Coach] will be notified.
He will be able to test and accept your Project.




[FUMBBLPlus Repository]: https://github.com/FUMBBLPlus/fumbblplus.github.io
[Git Submodules]: https://git-scm.com/book/en/v2/Git-Tools-Submodules
[Git]: https://git-scm.com/
[GitHub Pages]: http://pages.github.com/
[GitHub]: http://www.github.com
[Head Coach]: {{site.baseurl}}/help/staff#head-coach
[How to git clone with submodules]: http://stackoverflow.com/a/4438292/2334951
[Installing Git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[Jekyll]: http://jekyllrb.com/
[Markdown Cheatsheet]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[Markdown]: https://daringfireball.net/projects/markdown/basics
[Setting up your GitHub Pages site locally with Jekyll]: https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/
[SR Rankings Repository]: https://github.com/FUMBBLPlus/sr
