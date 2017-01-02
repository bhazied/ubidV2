<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationPostCategory;
use ContinuousNet\UbidElectricityBundle\Form\TranslationPostCategoryType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Post Category Controller
 * 
 * Manage TranslationPostCategories 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		TranslationPostCategoryController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationpostcategory")
 */
class TranslationPostCategoryController extends BaseController
{
	/**
	 * Lists all TranslationPostCategory entities.
	 *
	 * @Route("/", name="translationpostcategory_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationPostCategories = $em->getRepository('UbidElectricityBundle:TranslationPostCategory')->findAll();

		return $this->render('UbidElectricityBundle:TranslationPostCategory:index.html.twig', array(
			'translationPostCategories' => $translationPostCategories,
		));
	}

	/**
	 * Creates a new TranslationPostCategory entity.
	 *
	 * @Route("/new", name="translationpostcategory_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationPostCategory = new TranslationPostCategory();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationPostCategoryType', $translationPostCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPostCategory);
			$em->flush();

			return $this->redirectToRoute('translationpostcategory_show', array('id' => $translationPostCategory->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationPostCategory:new.html.twig', array(
			'translationPostCategory' => $translationPostCategory,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationPostCategory entity.
	 *
	 * @Route("/{id}", name="translationpostcategory_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationPostCategory $translationPostCategory)
	{
		$deleteForm = $this->createDeleteForm($translationPostCategory);

		return $this->render('UbidElectricityBundle:TranslationPostCategory:show.html.twig', array(
			'translationPostCategory' => $translationPostCategory,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationPostCategory entity.
	 *
	 * @Route("/{id}/edit", name="translationpostcategory_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationPostCategory $translationPostCategory)
	{
		$deleteForm = $this->createDeleteForm($translationPostCategory);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationPostCategoryType', $translationPostCategory);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPostCategory);
			$em->flush();

			return $this->redirectToRoute('translationpostcategory_edit', array('id' => $translationPostCategory->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationPostCategory:edit.html.twig', array(
			'translationPostCategory' => $translationPostCategory,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationPostCategory entity.
	 *
	 * @Route("/{id}", name="translationpostcategory_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationPostCategory $translationPostCategory)
	{
		$form = $this->createDeleteForm($translationPostCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationPostCategory);
			$em->flush();
		}

		return $this->redirectToRoute('translationpostcategory_index');
	}

	/**
	 * Creates a form to delete a TranslationPostCategory entity.
	 *
	 * @param TranslationPostCategory $translationPostCategory The TranslationPostCategory entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationPostCategory $translationPostCategory)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationpostcategory_delete', array('id' => $translationPostCategory->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
