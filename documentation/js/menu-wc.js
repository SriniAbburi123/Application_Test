'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">application_test documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-fa38da9e87e0599f876beb82088d92fa1e315e4396fc7ab4738cfdc5339a644e093fef001e4f8e12a8e86a40bed0a3f1e1820a87e6ff2ce67290716950f3f1ef"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-fa38da9e87e0599f876beb82088d92fa1e315e4396fc7ab4738cfdc5339a644e093fef001e4f8e12a8e86a40bed0a3f1e1820a87e6ff2ce67290716950f3f1ef"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-fa38da9e87e0599f876beb82088d92fa1e315e4396fc7ab4738cfdc5339a644e093fef001e4f8e12a8e86a40bed0a3f1e1820a87e6ff2ce67290716950f3f1ef"' :
                                            'id="xs-controllers-links-module-AuthModule-fa38da9e87e0599f876beb82088d92fa1e315e4396fc7ab4738cfdc5339a644e093fef001e4f8e12a8e86a40bed0a3f1e1820a87e6ff2ce67290716950f3f1ef"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-fa38da9e87e0599f876beb82088d92fa1e315e4396fc7ab4738cfdc5339a644e093fef001e4f8e12a8e86a40bed0a3f1e1820a87e6ff2ce67290716950f3f1ef"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-fa38da9e87e0599f876beb82088d92fa1e315e4396fc7ab4738cfdc5339a644e093fef001e4f8e12a8e86a40bed0a3f1e1820a87e6ff2ce67290716950f3f1ef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-fa38da9e87e0599f876beb82088d92fa1e315e4396fc7ab4738cfdc5339a644e093fef001e4f8e12a8e86a40bed0a3f1e1820a87e6ff2ce67290716950f3f1ef"' :
                                        'id="xs-injectables-links-module-AuthModule-fa38da9e87e0599f876beb82088d92fa1e315e4396fc7ab4738cfdc5339a644e093fef001e4f8e12a8e86a40bed0a3f1e1820a87e6ff2ce67290716950f3f1ef"' }>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeAnalyticsModule.html" data-type="entity-link" >EmployeeAnalyticsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmployeeAnalyticsModule-f16dae0c40d171d14684bb24272e66ed108a4a40619a9342a8cc5da320cffc47b8ab6b8789ec271f2e97a44ed599c0dc9587c1f76fe6a904d34789cefa9708ee"' : 'data-bs-target="#xs-injectables-links-module-EmployeeAnalyticsModule-f16dae0c40d171d14684bb24272e66ed108a4a40619a9342a8cc5da320cffc47b8ab6b8789ec271f2e97a44ed599c0dc9587c1f76fe6a904d34789cefa9708ee"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeeAnalyticsModule-f16dae0c40d171d14684bb24272e66ed108a4a40619a9342a8cc5da320cffc47b8ab6b8789ec271f2e97a44ed599c0dc9587c1f76fe6a904d34789cefa9708ee"' :
                                        'id="xs-injectables-links-module-EmployeeAnalyticsModule-f16dae0c40d171d14684bb24272e66ed108a4a40619a9342a8cc5da320cffc47b8ab6b8789ec271f2e97a44ed599c0dc9587c1f76fe6a904d34789cefa9708ee"' }>
                                        <li class="link">
                                            <a href="injectables/EmployeeAnalyticsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeAnalyticsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmployeeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link" >EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmployeeModule-2c973af8f17bffb526659fc4cb3878b17d56524e2551bf177ec8a6d370e18636ee5e76f087d5522a5e8b0d8bc31e875f7b9ddfaecd1b6dfd2f5a1d6c130656e1"' : 'data-bs-target="#xs-controllers-links-module-EmployeeModule-2c973af8f17bffb526659fc4cb3878b17d56524e2551bf177ec8a6d370e18636ee5e76f087d5522a5e8b0d8bc31e875f7b9ddfaecd1b6dfd2f5a1d6c130656e1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmployeeModule-2c973af8f17bffb526659fc4cb3878b17d56524e2551bf177ec8a6d370e18636ee5e76f087d5522a5e8b0d8bc31e875f7b9ddfaecd1b6dfd2f5a1d6c130656e1"' :
                                            'id="xs-controllers-links-module-EmployeeModule-2c973af8f17bffb526659fc4cb3878b17d56524e2551bf177ec8a6d370e18636ee5e76f087d5522a5e8b0d8bc31e875f7b9ddfaecd1b6dfd2f5a1d6c130656e1"' }>
                                            <li class="link">
                                                <a href="controllers/EmployeeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmployeeModule-2c973af8f17bffb526659fc4cb3878b17d56524e2551bf177ec8a6d370e18636ee5e76f087d5522a5e8b0d8bc31e875f7b9ddfaecd1b6dfd2f5a1d6c130656e1"' : 'data-bs-target="#xs-injectables-links-module-EmployeeModule-2c973af8f17bffb526659fc4cb3878b17d56524e2551bf177ec8a6d370e18636ee5e76f087d5522a5e8b0d8bc31e875f7b9ddfaecd1b6dfd2f5a1d6c130656e1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeeModule-2c973af8f17bffb526659fc4cb3878b17d56524e2551bf177ec8a6d370e18636ee5e76f087d5522a5e8b0d8bc31e875f7b9ddfaecd1b6dfd2f5a1d6c130656e1"' :
                                        'id="xs-injectables-links-module-EmployeeModule-2c973af8f17bffb526659fc4cb3878b17d56524e2551bf177ec8a6d370e18636ee5e76f087d5522a5e8b0d8bc31e875f7b9ddfaecd1b6dfd2f5a1d6c130656e1"' }>
                                        <li class="link">
                                            <a href="injectables/EmployeeAnalyticsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeAnalyticsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmployeeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-b8658342140a08fb1193a386908780c7466e32e579189f0297671c54f4beb42301b4b4f9295d4de592c0cb2890afb8e06a1bee7bc5c3cd20e3c4c3be0c2ce603"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-b8658342140a08fb1193a386908780c7466e32e579189f0297671c54f4beb42301b4b4f9295d4de592c0cb2890afb8e06a1bee7bc5c3cd20e3c4c3be0c2ce603"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-b8658342140a08fb1193a386908780c7466e32e579189f0297671c54f4beb42301b4b4f9295d4de592c0cb2890afb8e06a1bee7bc5c3cd20e3c4c3be0c2ce603"' :
                                            'id="xs-controllers-links-module-HealthModule-b8658342140a08fb1193a386908780c7466e32e579189f0297671c54f4beb42301b4b4f9295d4de592c0cb2890afb8e06a1bee7bc5c3cd20e3c4c3be0c2ce603"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LoggerModule-8f2bc43cd2816032d5968eb56501f49deb2c376d883f26352a3618a6fdcae4c425b35c5c3770e9dfc1548dfc42269ab455b574fe993130f6604e62f2f7f41206"' : 'data-bs-target="#xs-injectables-links-module-LoggerModule-8f2bc43cd2816032d5968eb56501f49deb2c376d883f26352a3618a6fdcae4c425b35c5c3770e9dfc1548dfc42269ab455b574fe993130f6604e62f2f7f41206"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-8f2bc43cd2816032d5968eb56501f49deb2c376d883f26352a3618a6fdcae4c425b35c5c3770e9dfc1548dfc42269ab455b574fe993130f6604e62f2f7f41206"' :
                                        'id="xs-injectables-links-module-LoggerModule-8f2bc43cd2816032d5968eb56501f49deb2c376d883f26352a3618a6fdcae4c425b35c5c3770e9dfc1548dfc42269ab455b574fe993130f6604e62f2f7f41206"' }>
                                        <li class="link">
                                            <a href="injectables/LoggerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoggerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SkillModule.html" data-type="entity-link" >SkillModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SkillModule-630d89bafba125dd1d4e793ce769795d51dcf2d49d542cbe18718eb6b9b4de82d171848c02dc364f5fba4955ce7394318901f410ecd7d0cf965ab72f8a383fb5"' : 'data-bs-target="#xs-controllers-links-module-SkillModule-630d89bafba125dd1d4e793ce769795d51dcf2d49d542cbe18718eb6b9b4de82d171848c02dc364f5fba4955ce7394318901f410ecd7d0cf965ab72f8a383fb5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SkillModule-630d89bafba125dd1d4e793ce769795d51dcf2d49d542cbe18718eb6b9b4de82d171848c02dc364f5fba4955ce7394318901f410ecd7d0cf965ab72f8a383fb5"' :
                                            'id="xs-controllers-links-module-SkillModule-630d89bafba125dd1d4e793ce769795d51dcf2d49d542cbe18718eb6b9b4de82d171848c02dc364f5fba4955ce7394318901f410ecd7d0cf965ab72f8a383fb5"' }>
                                            <li class="link">
                                                <a href="controllers/SkillController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SkillController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SkillModule-630d89bafba125dd1d4e793ce769795d51dcf2d49d542cbe18718eb6b9b4de82d171848c02dc364f5fba4955ce7394318901f410ecd7d0cf965ab72f8a383fb5"' : 'data-bs-target="#xs-injectables-links-module-SkillModule-630d89bafba125dd1d4e793ce769795d51dcf2d49d542cbe18718eb6b9b4de82d171848c02dc364f5fba4955ce7394318901f410ecd7d0cf965ab72f8a383fb5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SkillModule-630d89bafba125dd1d4e793ce769795d51dcf2d49d542cbe18718eb6b9b4de82d171848c02dc364f5fba4955ce7394318901f410ecd7d0cf965ab72f8a383fb5"' :
                                        'id="xs-injectables-links-module-SkillModule-630d89bafba125dd1d4e793ce769795d51dcf2d49d542cbe18718eb6b9b4de82d171848c02dc364f5fba4955ce7394318901f410ecd7d0cf965ab72f8a383fb5"' }>
                                        <li class="link">
                                            <a href="injectables/SkillService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SkillService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmployeeController.html" data-type="entity-link" >EmployeeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SkillController.html" data-type="entity-link" >SkillController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddSkillsEmployeeDto.html" data-type="entity-link" >AddSkillsEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthService.html" data-type="entity-link" >AuthService</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmployeeDto.html" data-type="entity-link" >CreateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSkillDto.html" data-type="entity-link" >CreateSkillDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Employee.html" data-type="entity-link" >Employee</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetMatchedEmployeeAllSkillsResponse.html" data-type="entity-link" >GetMatchedEmployeeAllSkillsResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetMatchedEmployeeSkillsResponse.html" data-type="entity-link" >GetMatchedEmployeeSkillsResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetMatchedEmployeeSkillsResponseDto.html" data-type="entity-link" >GetMatchedEmployeeSkillsResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Skill.html" data-type="entity-link" >Skill</a>
                            </li>
                            <li class="link">
                                <a href="classes/SkillSelectionDto.html" data-type="entity-link" >SkillSelectionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeeDto.html" data-type="entity-link" >UpdateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSkillDto.html" data-type="entity-link" >UpdateSkillDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/EmployeeAnalyticsService.html" data-type="entity-link" >EmployeeAnalyticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeService.html" data-type="entity-link" >EmployeeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HbsRenderService.html" data-type="entity-link" >HbsRenderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link" >LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseInterceptor.html" data-type="entity-link" >ResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SkillService.html" data-type="entity-link" >SkillService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateEditorService.html" data-type="entity-link" >TemplateEditorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZipExportService.html" data-type="entity-link" >ZipExportService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmployee.html" data-type="entity-link" >IEmployee</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISkill.html" data-type="entity-link" >ISkill</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggerConfig.html" data-type="entity-link" >LoggerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestLog.html" data-type="entity-link" >RequestLog</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});