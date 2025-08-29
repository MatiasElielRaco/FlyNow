import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

import terser from 'gulp-terser';
import sharp from 'sharp';

export function js ( done ) {
   src('src/js/**/*.js')
       .pipe(terser())
       .pipe(dest('build/js'));
    
    done();
}

export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass({
            style: 'compressed'
        }).on('error', sass.logError) )
        .pipe( dest('build/css', {sourcemaps: '.'}) );
    done()
}


export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp);
    sharp(file).avif({ quality: 50 }).toFile(outputFileAvif);
}

export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('src/img/**/*{jpg,png}', imagenes);
}

export default series( css, imagenes, js, dev);