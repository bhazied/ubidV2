<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationRegion;
use ContinuousNet\UbidElectricityBundle\Form\TranslationRegionType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Region Controller
 * 
 * Manage TranslationRegions 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		TranslationRegionController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationregion")
 */
class TranslationRegionController extends BaseController
{
	/**
	 * Lists all TranslationRegion entities.
	 *
	 * @Route("/", name="translationregion_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationRegions = $em->getRepository('UbidElectricityBundle:TranslationRegion')->findAll();

		return $this->render('UbidElectricityBundle:TranslationRegion:index.html.twig', array(
			'translationRegions' => $translationRegions,
		));
	}

	/**
	 * Creates a new TranslationRegion entity.
	 *
	 * @Route("/new", name="translationregion_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationRegion = new TranslationRegion();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationRegionType', $translationRegion);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationRegion);
			$em->flush();

			return $this->redirectToRoute('translationregion_show', array('id' => $translationRegion->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationRegion:new.html.twig', array(
			'translationRegion' => $translationRegion,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationRegion entity.
	 *
	 * @Route("/{id}", name="translationregion_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationRegion $translationRegion)
	{
		$deleteForm = $this->createDeleteForm($translationRegion);

		return $this->render('UbidElectricityBundle:TranslationRegion:show.html.twig', array(
			'translationRegion' => $translationRegion,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationRegion entity.
	 *
	 * @Route("/{id}/edit", name="translationregion_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationRegion $translationRegion)
	{
		$deleteForm = $this->createDeleteForm($translationRegion);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationRegionType', $translationRegion);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationRegion);
			$em->flush();

			return $this->redirectToRoute('translationregion_edit', array('id' => $translationRegion->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationRegion:edit.html.twig', array(
			'translationRegion' => $translationRegion,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationRegion entity.
	 *
	 * @Route("/{id}", name="translationregion_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationRegion $translationRegion)
	{
		$form = $this->createDeleteForm($translationRegion);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationRegion);
			$em->flush();
		}

		return $this->redirectToRoute('translationregion_index');
	}

	/**
	 * Creates a form to delete a TranslationRegion entity.
	 *
	 * @param TranslationRegion $translationRegion The TranslationRegion entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationRegion $translationRegion)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationregion_delete', array('id' => $translationRegion->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
